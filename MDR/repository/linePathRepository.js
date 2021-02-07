var LinePath = require('../models/linePath');

function saveLinePath(linePath) {
    try {
        linePath.save();
        return linePath;
    } catch (err) {
        throw err;
    }
}

function findAllLinePaths(){
    var allLinePaths = LinePath.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allLinePaths;
}

function findSpecificLinePath(req, res){
    var linePath = LinePath.findById(req.params.linePath_id, function (err) {
        if (err) {
            return res.send('LinePath ID not found.').status(404);
        }
    });
    return linePath;
}

module.exports.saveLinePath = saveLinePath;
module.exports.findAllLinePaths = findAllLinePaths;
module.exports.findSpecificLinePath = findSpecificLinePath;