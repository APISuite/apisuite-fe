# apisuite-client-sandbox

APISuite client sandbox

## Docker compose example for tests

You will need the `.env` and `cypress.env.json` files in the project root.

```yml
# docker-compose.yml
version: '3.6'
services:
  sandbox-client:
    build: .
    image: cloudoki/apisuite/sandbox/client
    ports:
      - "3500:8080"
```

run:

```bash
$docker-compose up -d --build
```

Go to [http://localhost:3500](http://localhost:3500)
