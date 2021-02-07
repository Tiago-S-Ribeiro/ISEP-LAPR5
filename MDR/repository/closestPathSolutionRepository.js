var ClosestPathSolution = require('../models/closestPathSolution');

function saveSolution(solution) {
    try {
        solution.save();
        return solution;
    } catch (err) {
        throw err;
    }
}

function findAllSolutions(){
    var allSolutions = ClosestPathSolution.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allSolutions;
}

module.exports.saveSolution = saveSolution;
module.exports.findAllSolutions = findAllSolutions;