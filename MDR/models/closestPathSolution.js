var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClosestPathSolution = new Schema({

    startingNode: String,
    endNode: String,
    leavingTime: Number,
    arrivingTime: Number,
    fullPath: [String]
});

module.exports = mongoose.model('ClosestPathSolution', ClosestPathSolution);