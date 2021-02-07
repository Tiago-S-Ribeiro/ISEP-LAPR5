const Joi = require('joi');
var ClosestPathSolution = require('../../models/closestPathSolution');
var repository = require('../../repository');

const closestPathValidation = (reqBodyData) => {

    const schema = Joi.object({

        startingNode: Joi.string().required(),
        endNode: Joi.string().required(),
        leavingTime: Joi.number().required(),
        arrivingTime: Joi.number().required(),
        fullPath: Joi.array().required()
    });

    return schema.validate(reqBodyData);
};

const postClosestPathSolution = async (req, res, next) => {

    const { error } = closestPathValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var cps = new ClosestPathSolution();

    cps.startingNode = req.body.startingNode;
    cps.endNode = req.body.endNode;
    cps.leavingTime = req.body.leavingTime;
    cps.arrivingTime = req.body.arrivingTime;
    cps.fullPath = req.body.fullPath;

    repository.saveSolution(cps);
    
    return next();
};

const attachAllSolutions = async (req, res, next) => {

    req.allSolutions = await repository.findAllSolutions();

    return next();
};

module.exports.postClosestPathSolution = postClosestPathSolution;
module.exports.attachAllSolutions = attachAllSolutions;