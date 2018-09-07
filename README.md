# nodemn-09-2018-serverless-gcloud
[September 2018 NodeMN](https://www.meetup.com/NodeMN/events/254418194/) presentation on [Serverless](https://serverless.com/) hosted on AWS.

# Presentation
TODO

# Authorization

- The `items` endpoints require _authorization_.
- Pass the `Authorization` header with one of the following values:
  - `token-allow` - You will be allowed access to the endpoint.
  - `token-deny` - You will be denied access to the endpoint (HTTP 403 - Forbidden).
  - `token-unauthorized` - You will be denied access to the endpoint (HTTP 401 - Unauthorized).
- If you do not pass the `Authorization` header, you will be denied  access to the endpoint (HTTP 401 - Unauthorized).
- The `http` endpoint does not require authorization.


# Endpoints
- GET - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/http
- GET - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items
- GET - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items/{id}
- POST - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items
- PUT - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items/{id}
- DELETE - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items/{id}

# Envelope
## Success

```
{ "data": ... }
```

## Error

```
{ "errors": [ { "key": "error-key", "message": "An error occurred" }, ... ] }
```

# Item Model
- id - string[uuid] - Unique identifier.
- name - string - Name for the item.
- quantity - integer - The number of items in stock.
- tags - array[string] - Key words associated with the item.
