var Path = require('../models/path');

function savePath(path) {
    try {
        path.save();
        return path;
    } catch (err) {
        throw err;
    }
}

function findAllPaths(){
    var allPaths = Path.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allPaths;
}

function findSpecificPath(req, res){
    var path = Path.findById(req.params.path_id, function (err) {
        if (err) {
            return res.send('Path ID not found.').status(404);
        }
    });
    return path;
}

module.exports.savePath = savePath;
module.exports.findAllPaths = findAllPaths;
module.exports.findSpecificPath = findSpecificPath;