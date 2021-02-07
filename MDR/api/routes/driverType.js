var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/driverTypes', router);

    router.get('/', middlewares.getAllDriverTypesUsingDTO, function (req, res) {
        return res.json({ driverTypes: req.allDriverTypes }).status(200);
    });

    router.get('/complete', middlewares.attachAllDriverTypes, function (req, res) {
        return res.json({ driverTypes: req.allDriverTypes }).status(200);
    });

    router.get('/:driverType_id', middlewares.attachDriverType, function (req, res){
        return res.json({ driverType: req.driverType }).status(200);
    });

    router.post('/', middlewares.createNewDriverType, function (req, res) {
        return res.json({ message: 'Driver Type was successfully added.' }).status(201);
    });

    router.delete('/:driverType_id', middlewares.deleteDriverType, function (req, res){
        return res.json({ message: 'Driver Type successfully deleted.' }).status(200);
    });

    router.put('/:driverType_id', middlewares.updateDriverType, function(req, res){
        return res.json({ message: 'Driver Type successfully updated.'}).status(200);
    });
};