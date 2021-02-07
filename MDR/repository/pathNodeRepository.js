var PathNode = require('../models/pathNode');

function savepathNode(pathNode) {
    try {
        pathNode.save();
        return pathNode;
    } catch (err) {
        throw err;
    }
}

function findAllPathNodes(){
    var allPathNodes = PathNode.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allPathNodes;
}

function findSpecificPathNode(req, res){
    var pathNode = PathNode.findById(req.params.pathNode_id, function (err) {
        if (err) {
            return res.send('PathNode ID not found.').status(404);
        }
    });
    return pathNode;
}

module.exports.savepathNode = savepathNode;
module.exports.findAllPathNodes = findAllPathNodes;
module.exports.findSpecificPathNode = findSpecificPathNode;