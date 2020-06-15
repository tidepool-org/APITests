## Local Setup

`source local.sh`

```sh
#!/bin/sh

export QA1_USER_EMAIL='<valid-user-email>'
export QA1_USER_PASSWORD='<user-password>'
```

## CLI
- `source local.sh`

- `newman run tests/API_contract_tests.postman_collection.json --folder "clients smoke test" -e tests/QA1.postman_environment.json --env-var "loginEmail=$QA1_USER_EMAIL" --env-var "loginPw=$QA1_USER_PASSWORD"`
