const Joi = require('joi');
var Line = require('../../models/line');
var LinePath = require('../../models/linePath');
var PathNode = require('../../models/pathNode');
var Path = require('../../models/path');
var Node = require('../../models/node');
var { lineDTO } = require('../../interfaces/lineDTO');
var repository = require('../../repository');

const lineValidation = (reqBodyData) => {

    const schema = Joi.object({

        key: Joi.string().min(1).required(),
        name: Joi.string().min(1).max(250).required(),
        color: Joi.array().max(3).min(3).default([0, 0, 0]),
        linePaths: Joi.array().default([])

    });

    return schema.validate(reqBodyData);
};

const createNewLine = async (req, res, next) => {

    const { error } = lineValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    var line = new Line();

    line.key = req.body.key;
    line.name = req.body.name;
    line.color = req.body.color;
    line.linePaths = req.body.linePaths;

    repository.saveLine(line);
    
    return next();
};

const getAllLinesUsingDTO = async (req, res, next) => {
    var query = {};
    var namePattern = "^" + req.query.name + ".*";

    if (req.query.name != undefined) {
        query.name = { $regex: namePattern, $options: 'i' };
    }
    if (req.query.key != undefined) {
        query.key = req.query.key;
    }

    var DTOlinesArray = [];
    var allLines = await repository.findAllLines(query, req.query.sort);
    allLines.map(line => {
        DTOlinesArray.push(lineDTO(line));
    });

    req.allLines = DTOlinesArray;
    return next();

};

const attachAllLines = async (req, res, next) => {

    req.allLines = await repository.findAllLines({});

    return next();

};

const attachLine = async (req, res, next) => {
    
    var line = await repository.findSpecificLine(req,res);
    //var dtoLine = lineDTO(line);
    req.line = line;

    return next();
};


const pathsByLine = async (req, res, next) => {

    var line = await Line.findById(req.params.line_id);
    var linePaths = await LinePath.find({ _id: line.linePaths }); //deconstruction -> id array of linePaths

    Promise.all(linePaths.map(async linePath => {                  //makes sure code inside is executed BEFORE 'then' call 
        var path = await Path.findById(linePath.path);              //map = for each
        var pathNodesArray = [];
        await Promise.all(path.pathNodes.map(async pathNode_id => {

            var pathNode = await PathNode.findById(pathNode_id);    //gets pathNode from its id
            var node = await Node.findById(pathNode.node);          //gets node from its id
            pathNode.node = node;                                   //to the node attribute of pathNode (formerly an id), adds the object
            pathNodesArray.push(pathNode);

        })).then(() => {
            Object.assign(path.pathNodes, pathNodesArray);          //adds array to pathNodes of the path (before, was array of ids, now its array of objs)
            linePath.path = path;                                   //adds the more complete path to the linePath
        });
    })).then(() => {
        line.linePaths = linePaths;                                 //adds the more complete linePath to the line
        req.line = line;                                            //adds it to the request
        return next();                                              //finito
    });
};


const deleteLine = async (req, res, next) => {
    Line.deleteOne({ _id: req.params.line_id }, function (err, line) {
        if (err) {
            return next(err);
        }
        return next();
    });
};

const updateLine = async (req, res, next) => {
    
    Line.findById(req.params.line_id, function (err, line) {
        if (err) {
            return next(err);
        }
        console.log(line)
        console.log(req.body)
        const { error } = lineValidation(req.body);
        
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        line.key = req.body.key;
        line.name = req.body.name;
        line.color = req.body.color;
        line.linePaths = req.body.linePaths;

        line.save(function (err) {
            if (err) {
                return next(err);
            }
            return next();
        });
    });
};

module.exports.createNewLine = createNewLine;
module.exports.attachAllLines = attachAllLines;
module.exports.attachLine = attachLine;
module.exports.deleteLine = deleteLine;
module.exports.updateLine = updateLine;
module.exports.pathsByLine = pathsByLine;
module.exports.getAllLinesUsingDTO = getAllLinesUsingDTO;