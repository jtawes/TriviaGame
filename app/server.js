const express = require('express');
const mongoose = require('mongoose');

const { PORT, HTTP_STATUS_CODES, MONGO_URL, TEST_MONGO_URL } = require('./config');
const { questionRouter } = require('./question/question.router');

let server;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static('./public'));

// ROUTER SETUP
app.use('/api/question', questionRouter); // Redirects all calls to /api/question to questionRouter
app.use("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Unhandled Express server HTTP requests
app.use('*', function(req, res) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: 'Not Found.' });
});

module.exports = {
    app,
    startServer,
    stopServer
};

function startServer(testEnv) {
    return new Promise((resolve, reject) =>  {
        let mongoUrl;

        if(testEnv) {
            mongoUrl = TEST_MONGO_URL;
        } else {
            mongoUrl = MONGO_URL;
        }
        mongoose.connect(mongoUrl, err => {
            if (err) {
                console.log(err);
                return reject(err);
            } else {
                server = app.listen(PORT, () => {
                    console.log(`Express server listening on http://localhost:${PORT}`);
                    resolve();
                }).on('error', err => {
                    console.error(err);
                    reject(err);
                });
            }
        });        
    });
}

function stopServer() {
    return mongoose
        .disconnect()
        .then(() => new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log('Express server stopped.');
                    resolve();
                }
            });
        }));
}