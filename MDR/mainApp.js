var express = require('express');
var config = require('./config');
var loader = require ('./loaders');

async function startServer() {
    var app = express();
    await loader({ expressApp: app });

    app.listen(config.port, () => { 
        console.log(`Server listening on port: ${config.port}`);
    }).on('error', err => { //addListener
        console.log.error(err);
        process.exit(1);
    });
}

startServer();