var DriverType = require('../models/driverType');

function saveDriverType(driverType) {
    try {
        driverType.save();
        return driverType;
    } catch (err) {
        throw err;
    }
}

function findAllDriverTypes(){
    var allDrivers = DriverType.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allDrivers;
}

function findSpecificDriverType(req, res){
    var driver = DriverType.findById(req.params.driverType_id, function (err) {
        if (err) {
            return res.send('DriverType ID not found.').status(404);
        }
    });
    return driver;
}

module.exports.saveDriverType = saveDriverType;
module.exports.findAllDriverTypes = findAllDriverTypes;
module.exports.findSpecificDriverType = findSpecificDriverType;