var Line = require('../models/line');

function saveLine(line) {
    try {
        line.save();
        return line;
    } catch (err) {
        throw err;
    }
}

function findAllLines(query, sort){
    
    if (sort == "name" || sort == "key") {
        if (query != undefined) {
            var l1 = Line.find(query).collation({ locale: "pt" }).sort({ [sort]: 1 });
            return l1;
        }
    } else {
        if (query != undefined) {
            var l2 = Line.find(query, function (err) {
                if (err) {
                    throw err;
                }
            });
            return l2;
        }
    }

}

function findSpecificLine(req, res){
    var line = Line.findById(req.params.line_id, function (err) {
        if (err) {
            return res.send('Line ID not found.').status(404);
        }
    });
    return line;
}

module.exports.saveLine = saveLine;
module.exports.findAllLines = findAllLines;
module.exports.findSpecificLine = findSpecificLine;