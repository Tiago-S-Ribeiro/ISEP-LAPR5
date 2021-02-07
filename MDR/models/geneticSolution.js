var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GeneticSolution = new Schema({

    drivers: [Number],
    score: Number
});

module.exports = mongoose.model('GeneticSolution', GeneticSolution);