const Joi = require('joi');
var DriverType = require('../../models/driverType');
var { driverTypeDTO } = require('../../interfaces/driverTypeDTO');
var repository = require('../../repository');

const driverTypeValidation = (reqBodyData) => {

    const schema = Joi.object({

        key: Joi.string().min(1).max(20).required(),
        name: Joi.string().min(1).max(250).required(),
        description: Joi.string().min(1).max(250).required()
    });

    return schema.validate(reqBodyData);
};

const createNewDriverType = async (req, res, next) => {

    const { error } = driverTypeValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var driverType = new DriverType();

    driverType.key = req.body.key;
    driverType.name = req.body.name;
    driverType.description = req.body.description;

    repository.saveDriverType(driverType);
    
    return next();
};

const attachAllDriverTypes = async (req, res, next) => {

    req.allDriverTypes = await repository.findAllDriverTypes();

    return next();
};

const getAllDriverTypesUsingDTO = async (req, res, next) => {

    var DTOdriverTypeArray = [];
    var allDrivers = await repository.findAllDriverTypes();
    allDrivers.map(driverType => {
        DTOdriverTypeArray.push(driverTypeDTO(driverType));
    });
    req.allDriverTypes = DTOdriverTypeArray;

    return next();
};

const attachDriverType = async (req, res, next) => {

    var driver = await repository.findSpecificDriverType(req,res);
    var dtoDriver = driverTypeDTO(driver);
    req.driverType = dtoDriver;

    return next();
};

const deleteDriverType = async (req, res, next) => {
    DriverType.deleteOne({ _id: req.params.driverType_id }, function (err, driverType) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

const updateDriverType = async (req, res, next) => {
    DriverType.findById(req.params.driverType_id, function (err, driverType) {
        if (err) {
            return next(err);
        }

        const { error } = driverTypeValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        driverType.key = req.body.key;
        driverType.name = req.body.name;
        driverType.description = req.body.description;

        driverType.save()
        return next();
    });
};

module.exports.createNewDriverType = createNewDriverType;
module.exports.attachAllDriverTypes = attachAllDriverTypes;
module.exports.attachDriverType = attachDriverType;
module.exports.deleteDriverType = deleteDriverType;
module.exports.updateDriverType = updateDriverType;
module.exports.getAllDriverTypesUsingDTO = getAllDriverTypesUsingDTO;