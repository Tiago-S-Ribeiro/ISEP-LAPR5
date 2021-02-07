var GeneticSolution = require('../models/geneticSolution');

function saveGenSolution(solution) {
    try {
        solution.save();
        return solution;
    } catch (err) {
        throw err;
    }
}

function findAllGenSolutions(){
    var allGenSolutions = GeneticSolution.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allGenSolutions;
}

module.exports.saveGenSolution = saveGenSolution;
module.exports.findAllGenSolutions = findAllGenSolutions;