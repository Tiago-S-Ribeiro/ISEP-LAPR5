var { saveDriverType, findAllDriverTypes, findSpecificDriverType } = require('./driverTypeRepository');
var { saveVehicleType, findAllVehicleTypes, findSpecificVehicleType } = require('./vehicleTypeRepository');
var { savepathNode, findAllPathNodes, findSpecificPathNode } = require('./pathNodeRepository');
var { savePath, findAllPaths, findSpecificPath } = require('./pathRepository');
var { saveNode, findAllNodes, findSpecificNode } = require('./nodeRepository');
var { saveLinePath, findAllLinePaths, findSpecificLinePath } = require('./linePathRepository');
var { saveLine, findAllLines, findSpecificLine } = require('./lineRepository');
var { saveSolution, findAllSolutions } = require('./closestPathSolutionRepository');
var { registerNewClient, findAllClients } = require('./clientRepository');
var { saveGenSolution, findAllGenSolutions } = require('./geneticSolutionRepository');

module.exports = {
    //Driver Type
    saveDriverType,
    findAllDriverTypes,
    findSpecificDriverType,
    //Vehicle Type
    saveVehicleType,
    findAllVehicleTypes,
    findSpecificVehicleType,
    //Path Nodes
    savepathNode,
    findAllPathNodes,
    findSpecificPathNode,
    //Paths
    savePath,
    findAllPaths,
    findSpecificPath,
    //Nodes
    saveNode,
    findAllNodes,
    findSpecificNode,
    //Line Paths
    saveLinePath,
    findAllLinePaths,
    findSpecificLinePath,
    //Lines
    saveLine,
    findAllLines,
    findSpecificLine,
    //Closest Path Solutions
    saveSolution,
    findAllSolutions,
    //Clients
    registerNewClient,
    findAllClients,
    //Genetic Solutions
    saveGenSolution,
    findAllGenSolutions
}