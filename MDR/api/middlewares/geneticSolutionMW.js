const Joi = require('joi');
var GeneticSolution = require('../../models/geneticSolution');
var repository = require('../../repository');

const geneticSolutionValidation = (reqBodyData) => {

    const schema = Joi.object({
        drivers: Joi.array().required(),
        score: Joi.number().required()
    });

    return schema.validate(reqBodyData);
};

const postGenSolution = async (req, res, next) => {

    const { error } = geneticSolutionValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var genSolution = new GeneticSolution();

    genSolution.drivers = req.body.drivers;
    genSolution.score = req.body.score;

    repository.saveGenSolution(genSolution);
    
    return next();
};

const attachAllGenSolutions = async (req, res, next) => {
    req.allGenSolutions = await repository.findAllGenSolutions();
    return next();
};

module.exports.postGenSolution = postGenSolution;
module.exports.attachAllGenSolutions = attachAllGenSolutions;