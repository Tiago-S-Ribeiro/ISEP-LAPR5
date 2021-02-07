var { createNewNode, attachAllNodes, attachNode, deleteNode, updateNode, getAllNodesUsingDTO } = require('./nodeMW');
var { createNewLine, attachAllLines, attachLine, deleteLine, updateLine, pathsByLine, getAllLinesUsingDTO } = require('./lineMW');
var { createNewVehicleType, attachAllVehicleTypes, attachVehicleType, deleteVehicleType, updateVehicleType, getAllVehicleTypesUsingDTO } = require('./vehicleTypeMW');
var { createNewDriverType, attachAllDriverTypes, attachDriverType, deleteDriverType, updateDriverType, getAllDriverTypesUsingDTO } = require('./driverTypeMW');
var { createNewLinePath, attachAllLinePaths, attachLinePath, deleteLinePath, createNewStandardLinePath, getAllLinePathsUsingDTO } = require('./linePathMW');
var { attachAllPathNodes, createNewPathNode, attachPathNode, deletePathNode, updatePathNode, getAllPathNodesUsingDTO } = require('./pathNodeMW');
var { attachAllPaths, createNewPath, attachPath, deletePath, updatePath, getPathsUsingDTO } = require('./pathMW');
var { attachAllSolutions, postClosestPathSolution } = require('./closestPathMW');
var { registerClient, login, /*attachAllClientsUsingDTO*/ attachAllClients, deleteClientAccount } = require('./clientMW');
var { attachAllGenSolutions, postGenSolution } = require('./geneticSolutionMW');

module.exports = {
    //Nodes
    createNewNode,
    attachAllNodes,
    attachNode,
    deleteNode,
    updateNode,
    getAllNodesUsingDTO,
    //Lines
    createNewLine,
    attachAllLines,
    attachLine,
    deleteLine,
    updateLine,
    pathsByLine,
    getAllLinesUsingDTO,
    //Vehicle Types
    createNewVehicleType,
    attachAllVehicleTypes,
    attachVehicleType,
    deleteVehicleType,
    updateVehicleType,
    getAllVehicleTypesUsingDTO,
    //Driver Types
    createNewDriverType,
    attachAllDriverTypes,
    attachDriverType,
    deleteDriverType,
    updateDriverType,
    getAllDriverTypesUsingDTO,
    //Line Paths
    createNewLinePath,
    attachAllLinePaths,
    attachLinePath,
    deleteLinePath,
    createNewStandardLinePath,
    getAllLinePathsUsingDTO,
    //Path Nodes
    attachAllPathNodes,
    createNewPathNode,
    attachPathNode,
    deletePathNode,
    updatePathNode,
    getAllPathNodesUsingDTO,
    //Path
    attachAllPaths,
    createNewPath,
    attachPath,
    deletePath,
    updatePath,
    getPathsUsingDTO,
    //Closest Path Solution
    attachAllSolutions,
    postClosestPathSolution,
    //Client
    registerClient,
    login,
    deleteClientAccount,
    //attachAllClientsUsingDTO,
    attachAllClients,
    //Genetic Solutions
    attachAllGenSolutions, 
    postGenSolution 
};