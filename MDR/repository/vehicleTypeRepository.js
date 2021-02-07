var VehicleType = require('../models/vehicleType');

function saveVehicleType(vehicleType) {
    try {
        vehicleType.save();
        return vehicleType;
    } catch (err) {
        throw err;
    }
}

function findAllVehicleTypes(){
    var allVehicles = VehicleType.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allVehicles;
}

function findSpecificVehicleType(req, res){
    var vehicle = VehicleType.findById(req.params.vehicleType_id, function (err) {
        if (err) {
            return res.send('VehicleType ID not found.').status(404);
        }
    });
    return vehicle;
}

module.exports.saveVehicleType = saveVehicleType;
module.exports.findAllVehicleTypes = findAllVehicleTypes;
module.exports.findSpecificVehicleType = findSpecificVehicleType;