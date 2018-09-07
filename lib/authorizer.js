'use strict';

const generatePolicy = function(principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

module.exports = (event, context, callback) => {

  var token = event.authorizationToken;
  /*
   *
   * extra custom authorization logic here: OAUTH, JWT ... etc
   *
   */

  // In this example, the token is treated as the status for simplicity.
  switch (token) {
    case 'token-allow':
      callback(null, generatePolicy('user', 'Allow', event.methodArn));
      break;
    case 'token-deny':
      callback(null, generatePolicy('user', 'Deny', event.methodArn));
      break;
    case 'token-unauthorized':
      callback('Unauthorized');
      break;
    default:
      callback('Error');
  }
};
