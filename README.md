#API Tests

## About

The API tests are a collection of requests put together with Postman in order to test the interaction between the Tidepool APIs. We are looking at

- response code
- response timing
- headers
- response json data to make sure it matches our schema expectations

### Running with Postman
In order to run these tests with postman you will need to import the postman collection and the environments into postman. https://learning.postman.com/docs/getting-started/importing-and-exporting-data/

After importing, You will also need to fill out the environment variables for each environment that have a value of 'from-environment'.

| Variable | Description |
| --- | ----------- |
| ```loginEmail``` | A valid email for a Tidepool User Account (Data Storage Only).|
| ```loginPw``` | A valid password for the above Data Storage User Account. |
| ```clinicianEmail``` | A valid email for a Tidepool User Account (Clinician Only). |
|```clinicianPw```|A valid password for the above Clinician Account.|
| ```clinicEmail``` | A valid email for a Tidepool User Account (Clinic, only available on dev1 using the clinic service). |
| ```clinicPw``` | A valid password for the above Clinic Account. |

In order to run the requests, you must run them as a collection, as opposed to an individual request. This is because the requests use local variables, created by another request's reponse, in order to craft subsequent requests. 
Simply put, click on the folder pertaining to the tests you'd like to run (you can choose a folder containing more folders if you want to run a larger collection or a folder within a folder to run a smaller suite of requests, then click "run" in the upper right corner.

### Running with Newman
Newman is a command-line Collection Runner for Postman.
https://www.npmjs.com/package/newman
In order to use newman you can setup your environment variables using the above table as a guide and then run your desired collection by choosing a folder name and using your environment variables.

#### Local Setup

`source local.sh`

```sh
#!/bin/sh

export TIDEPOOL_LOGIN_EMAIL='<valid-user-email>'
export TIDEPOOL_LOGIN_PW='<user-password>'
```

#### CLI
- `source local.sh`

- `newman run tests/API_contract_tests.postman_collection.json --folder "Clinician signup and setup" -e tests/QA1.postman_environment.json --env-var "loginEmail=$TIDEPOOL_LOGIN_EMAIL" --env-var "loginPw=$TIDEPOOL_LOGIN_PW"`
