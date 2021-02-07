var { getAllLinesDTO, getAllLines, getLineById, postLine } = require('./linesTestFunctions');
var { getAllDriverTypesDTO, getAllDriverTypes, getDriverTypeById, postDriverType } = require('./driverTypesFunctions');
var { getAllVehicleTypesDTO, getAllVehicleTypes, getVehicleTypeById, postVehicleType } = require('./vehicleTypesFunctions');
var { getAllNodesDTO, getAllNodes, getNodeById, postNode } = require('./nodesTestFunctions');
var { getAllPathNodesDTO, getAllPathNodes, getPathNodeById, postPathNode } = require('./pathNodeTestFunctions');
var { getPathsUsingDTO, getAllPaths, getPathById, postPath } = require('./pathTestFunctions');
var { getAllLinePathsDTO, getAllLinePaths, getLinePathById, postLinePath } = require('./linePathTestFunctions');

module.exports = {
    getAllLinesDTO,
    getAllLines,
    getLineById,
    postLine,
    getAllDriverTypesDTO,
    getAllDriverTypes,
    getDriverTypeById,
    postDriverType,
    getAllNodesDTO,
    getAllNodes,
    getNodeById,
    postNode,
    getAllPathNodesDTO,
    getAllPathNodes,
    getPathNodeById,
    postPathNode,
    getAllVehicleTypesDTO,
    getAllVehicleTypes,
    getVehicleTypeById,
    postVehicleType,
    getPathsUsingDTO,
    getAllPaths,
    getPathById,
    postPathNode,
    postPath,
    getAllLinePathsDTO, 
    getAllLinePaths, 
    getLinePathById, 
    postLinePath
};