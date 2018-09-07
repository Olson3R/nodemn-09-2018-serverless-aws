const ItemDb = require('./item-db');
const uuid = require('uuid/v4');
const validator = require('validator');
const _ = require('lodash');

const createJsonResponse = (statusCode, data, errors) => {
  return {
    statusCode: statusCode || 501,
    headers: {
      'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials' : true, // Required for cookies, authorization headers with HTTPS
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(errors ? { errors: errors } : { data: data })
  }
}

const validateParams = (params) => {
  let errors = [];

  // Name
  if (!params.name || validator.isEmpty(params.name, { ignore_whitespace: true })) {
    errors.push({ key: 'name-required', message: 'Name is required.' });
  } else if (!_.isString(params.name)) {
    errors.push({ key: 'name-not-string', message: 'Name must be a string.' });
  } else if (validator.isIn(params.name, _.map(ItemDb.items, 'name'))) {
    errors.push({ key: 'name-unique', message: 'Name is already taken.' });
  }

  // Quantity
  if (!params.quantity) {
    errors.push({ key: 'quantity-required', message: 'Quantity is required.' });
  } else if (!_.isInteger(params.quantity)) {
    errors.push({ key: 'quantity-not-integer', message: 'Quantity must be an integer.' });
  } else if (params.quantity < 0) {
    errors.push({ key: 'quantity-negative', message: 'Quantity cannot be negative.' });
  }

  // Tags
  _.each(params.tags, function (tag) {
    if (!_.isString(tag)) {
      errors.push({ key: 'tag-not-string', message: 'Tags must be a string.' });
      return false;
    }
  });

  return errors;
}

const findItem = (event) => {
  let id = event.pathParameters.id;
  return _.find(ItemDb.items, { id: id });
}

let ItemsApi = {
  index: (event, context, callback) => {
    let scopes = _.pick(event.queryStringParameters, ['id', 'name']);
    let items = _.filter(ItemDb.items, scopes);
    callback(null, createJsonResponse(200, items));
  },
  show: (event, context, callback) => {
    let item = findItem(event);
    if (item) return callback(null, createJsonResponse(200, item));
    callback(null, createJsonResponse(404, null, [{ key: 'not-found', message: 'Item not found.' }]));
  },
  create: (event, context, callback) => {
    let body = event.body && JSON.parse(event.body);
    let params = _.pick(body, ['name', 'quantity', 'tags']);
    params.tags = _.compact(params.tags);
    let errors = validateParams(params);
    if (_.isEmpty(errors)) {
      params.id = uuid();
      return callback(null, createJsonResponse(201, params));
    }
    callback(null, createJsonResponse(422, null, errors));
  },
  update: (event, context, callback) => {
    let item = findItem(event);
    if (!item) {
      callback(null, createJsonResponse(404, null, [{ key: 'not-found', message: 'Item not found.' }]));
      return;
    }
    let body = event.body && JSON.parse(event.body);
    let params = _.pick(body, ['name', 'quantity', 'tags']);
    params.tags = _.compact(params.tags);
    let errors = validateParams(params);
    if (_.isEmpty(errors)) return callback(null, createJsonResponse(200, _.assign(item, params)));
    callback(null, createJsonResponse(422, null, errors));
  },
  delete: (event, context, callback) => {
    let item = findItem(event);
    if (!item) {
      callback(null, createJsonResponse(404, null, [{ key: 'not-found', message: 'Item not found.' }]));
      return;
    }
    callback(null, createJsonResponse(204, null));
  }
};

module.exports = ItemsApi;
