const Joi = require('joi');
var PathNode = require('../../models/pathNode');
var {pathNodeDTO} = require('../../interfaces/pathNodeDTO');
var repository = require('../../repository');

const pathNodeValidation = (reqBodyData) => {

    const schema = Joi.object({

        key: Joi.string().min(1).max(20).required(),
        node: Joi.string().required(),
        duration: Joi.number().min(0),
        distance: Joi.number().min(0)
    });

    return schema.validate(reqBodyData);
};

const createNewPathNode = async (req, res, next) => {

    const { error } = pathNodeValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var pathNode = new PathNode();

    pathNode.key = req.body.key;
    pathNode.node = req.body.node;
    pathNode.duration = req.body.duration;
    pathNode.distance = req.body.distance;

    repository.savepathNode(pathNode);

    return next();
};

const attachAllPathNodes = async (req, res, next) => {

    req.allPathNodes = await repository.findAllPathNodes();

    return next();
};

const getAllPathNodesUsingDTO = async (req, res, next) => {

    var DTOpathNodesArray = [];
    var allPathNodes = await repository.findAllPathNodes();
    allPathNodes.map(pathNode => {
        DTOpathNodesArray.push(pathNodeDTO(pathNode));
    });
    req.allPathNodes = DTOpathNodesArray;

    return next();
};


const attachPathNode = async (req, res, next) => {
    
    var pathNode = await repository.findSpecificPathNode(req,res);
    var dtoPathNode = pathNodeDTO(pathNode);
    req.pathNode = dtoPathNode;
    
    return next();

};

const deletePathNode = async (req, res, next) => {

    PathNode.deleteOne({ _id: req.params.pathNode_id }, function (err, pathNode) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

const updatePathNode = async (req, res, next) => {

    PathNode.findById(req.params.pathNode_id, function (err, pathNode) {
        if (err) {
            return next(err);
        }

        const { error } = pathNodeValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        pathNode.key = req.body.key;
        pathNode.node = req.body.node;
        pathNode.duration = req.body.duration;
        pathNode.distance = req.body.distance;

        pathNode.save();
        return next();
    });
};

module.exports.attachAllPathNodes = attachAllPathNodes;
module.exports.createNewPathNode = createNewPathNode;
module.exports.attachPathNode = attachPathNode;
module.exports.deletePathNode = deletePathNode;
module.exports.updatePathNode = updatePathNode;
module.exports.getAllPathNodesUsingDTO = getAllPathNodesUsingDTO;