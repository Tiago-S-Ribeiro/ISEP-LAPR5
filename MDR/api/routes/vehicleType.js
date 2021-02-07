var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/vehicleTypes', router);

    router.get('/', middlewares.getAllVehicleTypesUsingDTO, function (req, res) {
        return res.json({ vehicleTypes: req.allVehicleTypes }).status(200);
    });

    router.get('/complete', middlewares.attachAllVehicleTypes, function (req, res) {
        return res.json({ vehicleTypes: req.allVehicleTypes }).status(200);
    });

    router.get('/:vehicleType_id', middlewares.attachVehicleType, function (req, res){
        return res.json({ vehicleType: req.vehicleType }).status(200);
    });

    router.post('/', middlewares.createNewVehicleType, function (req, res) {
        return res.json({ message: 'Vehicle Type was successfully added.' }).status(201);
    });

    router.delete('/:vehicleType_id', middlewares.deleteVehicleType, function (req, res){
        return res.json({ message: 'Vehicle Type successfully deleted.' }).status(200);
    });

    router.put('/:vehicleType_id', middlewares.updateVehicleType, function(req, res){
        return res.json({ message: 'Vehicle Type successfully updated.'}).status(200);
    });
};