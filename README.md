## End points

`POST /run`

example:

```bash
curl -i -X POST -H "Content-Type: application/json" -d '{"target":"qa1", "commit":"b40068a96097c7272a208bd6b55358058f55a903"}' localhost:8080/run
```

`GET /status`

example:

```bash
curl -i localhost:8080/status
```

## Local Setup

`source local.sh`

```sh
#!/bin/sh

export QA1_USER_EMAIL='<valid-user-email>'
export QA1_USER_PASSWORD='<user-password>'

node -r esm app.js
```

## CLI
- `source local.sh`

- `newman run tests/API_smoke_test.postman_collection.json --folder "clients smoke test" -e tests/QA1.postman_environment.json --env-var "loginEmail=$QA1_USER_EMAIL" --env-var "loginPw=$QA1_USER_PASSWORD"`