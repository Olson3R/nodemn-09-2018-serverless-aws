# nodemn-09-2018-serverless-gcloud
[September 2018 NodeMN](https://www.meetup.com/NodeMN/events/254418194/) presentation on [Serverless](https://serverless.com/) hosted on AWS.

# Presentation
https://docs.google.com/presentation/d/1uyn_ejfIkaejhZ6xanRnFtiTIRbOCzwK-RrT521IpOY/edit?usp=sharing

# Installation
- Make sure you have a proper version of node 8.10.
  - I recommend using [nvm](https://github.com/creationix/nvm) along with [avn](https://github.com/wbyoung/avn).
- Install serverless globally `npm install -g serverless`.
- Install modules `npm install`

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
  - Doesn't actually persist new items.
- PUT - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items/{id}
  - Doesn't actually persist updates to items.
- DELETE - https://38s3jpykvj.execute-api.us-east-1.amazonaws.com/dev/items/{id}
  - Doesn't actually delete items.

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
- `id` - string[uuid] - Unique identifier.
- `name` - string - Name for the item.
- `quantity` - integer - The number of items in stock.
- `tags` - array[string] - Key words associated with the item.

# Workshop

- Create a CLI app to consume the `items` endpoints.
  - [Commander](https://github.com/tj/commander.js) - Node.js command-line interfaces made easy.
  - [Request](https://github.com/request/request) - Simplified HTTP request client.
- Create your own endpoints (and run locally).
  - Fork the repo.
  - Follow the [installation instructions](https://github.com/Olson3R/nodemn-09-2018-serverless-aws#installation) above.
  - Add your endpoints.
    - Will have to add your handler code. Similar to [this](https://github.com/Olson3R/nodemn-09-2018-serverless-aws/blob/master/lib/items-api.js#L56-L60)
    - Will have to add the endpoints to the [serverless.yml](https://github.com/Olson3R/nodemn-09-2018-serverless-aws/blob/master/serverless.yml) file.
  - Start the serverless offline server `serverless offline`
  - Submit a pull request to this project.
  
