const Authorizer = require('./lib/authorizer');
const util = require('util');

exports.authorizer = Authorizer;

exports.http = (event, context, callback) => {
  callback(null, { statusCode: 200, body: `You successfully hit the http endpoint!'\n\n${util.inspect(event)}` });
};
