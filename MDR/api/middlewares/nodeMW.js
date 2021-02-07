const Joi = require('joi');
var Node = require('../../models/node');
var { nodeDTO } = require('../../interfaces/nodeDTO');
var repository = require('../../repository');

const nodeValidation = (reqBodyData) => {
    const schema = Joi.object({

        key: Joi.string().min(1).max(20).required(),
        name: Joi.string().min(1).max(200).required(),
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        shortName: Joi.string().min(1).max(10).required(),
        isDepot: Joi.boolean().default(false).required(),
        isReliefPoint: Joi.boolean().default(false).required(),

    });

    return schema.validate(reqBodyData);
};

const createNewNode = async (req, res, next) => {

    const { error } = nodeValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var node = new Node();

    node.key = req.body.key;
    node.name = req.body.name;
    node.latitude = req.body.latitude;
    node.longitude = req.body.longitude;
    node.shortName = req.body.shortName;
    node.isDepot = req.body.isDepot;
    if (node.isDepot == true) {
        node.isReliefPoint = true;
    } else {
        node.isReliefPoint = req.body.isReliefPoint;
    }

    repository.saveNode(node);

    return next();
};

const attachAllNodes = async (req, res, next) => {

    req.allNodes = await repository.findAllNodes({});

    return next();
};

const getAllNodesUsingDTO = async (req, res, next) => {
    var query = {};
    var namePattern = "^" + req.query.name + ".*";
    // if query name is defined, make a regex pattern for querying DB
    if (req.query.name != undefined) {
        query.name = { $regex: namePattern, $options: 'i' };
    } //if query key is defined, add it to query, to search that exact value
    if (req.query.key != undefined) {
        query.key = req.query.key;
    } //if query isDepot and isRelief are defined, add it to query to search the exact value
    if (req.query.isDepot != undefined) {
        query.isDepot = req.query.isDepot;
    }
    if (req.query.isReliefPoint != undefined) {
        query.isReliefPoint = req.query.isReliefPoint;
    }

    var DTOnodesArray = [];
    var allNodes = await repository.findAllNodes(query, req.query.sort);
    allNodes.map(node => {
        DTOnodesArray.push(nodeDTO(node));
    });

    req.allNodes = DTOnodesArray;
    return next();
};

const attachNode = async (req, res, next) => {

    var node = await repository.findSpecificNode(req,res);
    //var dtoNode = nodeDTO(node);
    //req.node = dtoNode;
    req.node = node;

    return next();

};

const deleteNode = async (req, res, next) => {
    Node.deleteOne({ _id: req.params.node_id }, function (err, node) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

const updateNode = async (req, res, next) => {
    Node.findById(req.params.node_id, function (err, node) {
        if (err) {
            return next(err);
        }

        const { error } = nodeValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        node.key = req.body.key;
        node.name = req.body.name;
        node.latitude = req.body.latitude;
        node.longitude = req.body.longitude;
        node.shortName = req.body.shortName;
        node.isDepot = req.body.isDepot;
        node.isReliefPoint = req.body.isReliefPoint;

        node.save(function (err) {
            if (err) {
                return next(err);
            }
            return next();
        });
    });
};

module.exports.createNewNode = createNewNode;
module.exports.attachAllNodes = attachAllNodes;
module.exports.attachNode = attachNode;
module.exports.deleteNode = deleteNode;
module.exports.updateNode = updateNode;
module.exports.getAllNodesUsingDTO = getAllNodesUsingDTO;