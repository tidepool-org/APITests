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

export QA1_API_USER_EMAIL='<valid-user-email>'
export QA1_API_USER_PW='<user-password>'

node -r esm app.js
```