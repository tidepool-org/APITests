import express from 'express';
import bodyParser from 'body-parser';
import { run } from 'newman';

const app = express();
app.use(bodyParser.json());

const PORT = 8080;

app.get('/status', function (req, res) {
    return res.status(200).send('OK');
})

function getConfig(targetEnv) {
    let setUser = function (email, pw) {
        for (let index = 0; index < jsonConfig.values.length; index++) {
            if (jsonConfig.values[index].key === 'loginEmail') {
                jsonConfig.values[index].value = email;
            }
            if (jsonConfig.values[index].key === 'loginPw') {
                jsonConfig.values[index].value = pw;
            }
        }
    };
    let jsonConfig = null;
    if (targetEnv.toLowerCase() == 'qa1') {
        jsonConfig = require('./tests/QA1.postman_environment.json');
        setUser(process.env.QA1_API_USER_EMAIL, process.env.QA1_API_USER_PW);
    }
    console.log("config: ", jsonConfig);
    return jsonConfig;
}

/**
 * {
 *      "commit":"b40068a96097c7272a208bd6b55358058f55a903",
 *      "target":"qa1",
 * }
 */
app.post('/run', function (req, res) {
    let commitId = req.body.commit;
    let targetEnv = req.body.target;
    let config = getConfig(targetEnv.trim());
    if (config == null) {
        return res.status(400).send('Invalid target: ' + targetEnv);
    }
    run({
        collection: require('./tests/API_smoke_test.postman_collection.json'),
        environment: config,
        reporters: 'htmlextra',
    }, function (err, summary) {
        if (err) {
            return res.status(500).send(err);
        } else if (summary.error) {
            return res.status(500).send(summary.error);
        }
        console.log('summary: ', summary.run.stats);
        return res.status(200).send({ results: summary.run.stats });
    });
})

app.listen(PORT)