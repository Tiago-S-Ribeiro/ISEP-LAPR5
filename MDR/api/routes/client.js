var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');
//const verify = require('./verifyToken');

module.exports = (app) => {

    app.use('/clients', router);

    router.post('/register', middlewares.registerClient, function (req, res) {
        return res.json({ message: 'Client was successfully registered.' }).status(201);
    });

    router.post('/login', middlewares.login, function (req, res) {
        return res.json({ message: 'Logged in.' }).status(201);
    });
    
    // router.get('/', verify, function (req, res){
    //     return res.json({ client: req.client }).status(200);
    // });

    router.delete('/:client_id', middlewares.deleteClientAccount, function (req, res){
        return res.json({ message: 'Client\'s account was successfully deleted.' }).status(200);
    });

    router.get('/', middlewares.attachAllClients, function (req, res){
        return res.json({ clients: req.allClients }).status(200);
    });
};