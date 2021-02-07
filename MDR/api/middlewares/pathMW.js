const Joi = require('joi');
var Path = require('../../models/path');
var {pathDTO} = require('../../interfaces/pathDTO');
var repository = require('../../repository');

const pathValidation = (reqBodyData) => {

    const schema = Joi.object({

        key: Joi.string().min(1).max(20).required(),
        isEmpty: Joi.boolean().required(),
        pathNodes: Joi.array().default([])
    });

    return schema.validate(reqBodyData);
};

const createNewPath = async (req, res, next) => {

    const { error } = pathValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var path = new Path();

    path.key = req.body.key;
    path.isEmpty = req.body.isEmpty;
    path.pathNodes = req.body.pathNodes;

    repository.savePath(path);

    return next();
};

const attachAllPaths = async (req, res, next) => {

    req.allPaths = await repository.findAllPaths();

    return next();

};

const getPathsUsingDTO = async (req, res, next) => {

    var DTOpathArray = [];
    var allPaths = await repository.findAllPaths();
    allPaths.map(path => {
        DTOpathArray.push(pathDTO(path));
    });
    req.allPaths = DTOpathArray;

    return next();

};

const attachPath = async (req, res, next) => {
    
    var path = await repository.findSpecificPath(req,res);
    var dtoPath = pathDTO(path);
    req.thisPath = dtoPath;

    return next();

};

const deletePath = async (req, res, next) => {
    Path.deleteOne({ _id: req.params.path_id }, function (err, path) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

const updatePath = async (req, res, next) => {
    Path.findById(req.params.path_id, function (err, path) {
        if (err) {
            return next(err);
        }

        const { error } = pathValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        path.key = req.body.key;
        path.isEmpty = req.body.isEmpty;
        path.pathNodes = req.body.pathNodes;

        path.save(function (err) {
            if (err) {
                return next(err);
            }
            return next();
        });
    });
};

module.exports.attachAllPaths = attachAllPaths;
module.exports.createNewPath = createNewPath;
module.exports.attachPath = attachPath;
module.exports.deletePath = deletePath;
module.exports.updatePath = updatePath;
module.exports.getPathsUsingDTO = getPathsUsingDTO;