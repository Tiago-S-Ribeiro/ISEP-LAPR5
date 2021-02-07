const Joi = require('joi');
var LinePath = require('../../models/linePath');
var PathNode = require('../../models/pathNode');
var Path = require('../../models/path');
var Node = require('../../models/node');
var { linePathDTO } = require('../../interfaces/linePathDTO');
var repository = require('../../repository');

const linePathValidation = (reqBodyData) => {

    const schema = Joi.object({

        key: Joi.string().min(1).max(20).required(),
        path: Joi.string().required(),
        orientation: Joi.string().valid("Go", "Return").required()

    });

    return schema.validate(reqBodyData);
};

const createNewLinePath = async (req, res, next) => {

    const { error } = linePathValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    var linePath = new LinePath();
    var path = new Path();

    var pathNodesArray = [];

    Promise.all(req.body.path.pathNodes.map(async pathNode => {
        var idExists = await Node.findById(pathNode.node);
        if (idExists == undefined) {
            return res.status(400).send("Node ID not found.");
        }

        let newPathNode = new PathNode();
        newPathNode.key = pathNode.key;
        newPathNode.node = pathNode.node;
        newPathNode.duration = pathNode.duration;
        newPathNode.distance = pathNode.distance;
        pathNodesArray.push(newPathNode._id);

        await newPathNode.save(function (err) {
            if (err) {
                return next(err);
            }
        });

    })).then(async () => {
        path.key = req.body.path.key;
        path.isEmpty = req.body.path.isEmpty;
        path.pathNodes = pathNodesArray;
        await path.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    }).then(async () => {
        linePath.key = req.body.key;
        linePath.path = path._id;
        linePath.orientation = req.body.orientation;

        await linePath.save(function (err) {
            if (err) {
                return next(err);
            }
        });
        return next();
    });
};

const createNewStandardLinePath = async (req, res, next) => {

    const { error } = linePathValidation(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var standardLP = new LinePath();

    standardLP.key = req.body.key;
    standardLP.path = req.body.path;
    standardLP.orientation = req.body.orientation;

    repository.saveLinePath(standardLP);
    
    return next();
};

const attachAllLinePaths = async (req, res, next) => {

    req.allLinePaths = await repository.findAllLinePaths();

    return next();

};

const getAllLinePathsUsingDTO = async (req, res, next) => {

    var DTOlinePathArray = [];
    var allLinePaths = await repository.findAllLinePaths();
    allLinePaths.map(linePath => {
        DTOlinePathArray.push(linePathDTO(linePath));
    });
    req.allLinePaths = DTOlinePathArray;

    return next();

};

const attachLinePath = async (req, res, next) => {
    
    var linePath = await repository.findSpecificLinePath(req,res);
    var dtoLinePath = linePathDTO(linePath);
    req.linePath = dtoLinePath;

    return next();

};

const deleteLinePath = async (req, res, next) => {
    LinePath.deleteOne({ _id: req.params.linePath_id }, function (err, linePath) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

module.exports.createNewLinePath = createNewLinePath;
module.exports.attachAllLinePaths = attachAllLinePaths;
module.exports.attachLinePath = attachLinePath;
module.exports.deleteLinePath = deleteLinePath;
module.exports.createNewStandardLinePath = createNewStandardLinePath;
module.exports.getAllLinePathsUsingDTO = getAllLinePathsUsingDTO;