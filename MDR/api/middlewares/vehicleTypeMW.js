const Joi = require('joi');
var VehicleType = require('../../models/vehicleType');
var { vehicleTypeDTO } = require('../../interfaces/vehicleTypeDTO');
var repository = require('../../repository');

const vehicleTypeValidation = (reqBodyData) => {

    const schema = Joi.object({

        key: Joi.string().min(1).max(20).required(),
        name: Joi.string().min(1).max(250).required(),
        autonomy: Joi.number().min(1).required(),
        cost: Joi.number().min(0).required(),
        averageSpeed: Joi.number().min(1).default(30).required(),
        energySource: Joi.number().required(),
        consumption: Joi.number().min(1).required(),
        emissions: Joi.number().min(0).required(),
        vehicles: Joi.array().default([])
    });

    return schema.validate(reqBodyData);
};

const createNewVehicleType = async (req, res, next) => {

    const { error } = vehicleTypeValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var vehicleType = new VehicleType();

    vehicleType.key = req.body.key;
    vehicleType.name = req.body.name;
    vehicleType.autonomy = req.body.autonomy;
    vehicleType.cost = req.body.cost;
    vehicleType.averageSpeed = req.body.averageSpeed;
    vehicleType.energySource = req.body.energySource;
    vehicleType.consumption = req.body.consumption;
    vehicleType.emissions = req.body.emissions;
    vehicleType.vehicles = req.body.vehicles;

    repository.saveVehicleType(vehicleType);

    return next();
};

const attachAllVehicleTypes = async (req, res, next) => {

    req.allVehicleTypes = await repository.findAllVehicleTypes();

    return next();

};

const getAllVehicleTypesUsingDTO = async (req, res, next) => {

    var DTOvehicleTypesArray = [];
    var allVehicles = await repository.findAllVehicleTypes();
    allVehicles.map(vehicleType => {
        DTOvehicleTypesArray.push(vehicleTypeDTO(vehicleType));
    });
    req.allVehicleTypes = DTOvehicleTypesArray;

    return next();

};

const attachVehicleType = async (req, res, next) => {
    
    var vehicle = await repository.findSpecificVehicleType(req,res);
    var dtoVehicle = vehicleTypeDTO(vehicle);
    req.vehicleType = dtoVehicle;

    return next();
};

const deleteVehicleType = async (req, res, next) => {
    VehicleType.deleteOne({ _id: req.params.vehicleType_id }, function (err, vehicleType) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

const updateVehicleType = async (req, res, next) => {
    VehicleType.findById(req.params.vehicleType_id, function (err, vehicleType) {
        if (err) {
            return next(err);
        }

        const { error } = vehicleTypeValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        vehicleType.key = req.body.key;
        vehicleType.name = req.body.name;
        vehicleType.autonomy = req.body.autonomy;
        vehicleType.cost = req.body.cost;
        vehicleType.averageSpeed = req.body.averageSpeed;
        vehicleType.energySource = req.body.energySource;
        vehicleType.consumption = req.body.consumption;
        vehicleType.emissions = req.body.emissions;
        vehicleType.vehicles = req.body.vehicles;

        vehicleType.save(function (err) {
            if (err) {
                return next(err);
            }
            return next();
        });
    });
};

module.exports.createNewVehicleType = createNewVehicleType;
module.exports.attachAllVehicleTypes = attachAllVehicleTypes;
module.exports.attachVehicleType = attachVehicleType;
module.exports.deleteVehicleType = deleteVehicleType;
module.exports.updateVehicleType = updateVehicleType;
module.exports.getAllVehicleTypesUsingDTO = getAllVehicleTypesUsingDTO;