var Node = require('../models/node');

function saveNode(node) {
    try {
        node.save();
        return node;
    } catch (err) {
        throw err;
    }
}

function findAllNodes(query, sort) {
    
    if (sort == "name" || sort == "key") {
        if (query != undefined) {
            var n1 = Node.find(query).collation({ locale: "pt" }).sort({ [sort]: 1 });
            return n1;
        }
    } else {
        if (query != undefined) {
            var n3 = Node.find(query, function (err) {
                if (err) {
                    throw err;
                }
            });
            return n3;
        }
    }
}

function findSpecificNode(req, res) {
    var node = Node.findById(req.params.node_id, function (err) {
        if (err) {
            return res.send('Node ID not found.').status(404);
        }
    });
    return node;
}

module.exports.saveNode = saveNode;
module.exports.findAllNodes = findAllNodes;
module.exports.findSpecificNode = findSpecificNode;