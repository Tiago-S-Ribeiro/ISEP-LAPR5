var {Router} = require('express');
var node = require('./routes/node');
var line = require('./routes/line');
var vehicleType = require('./routes/vehicleType');
var driverType = require('./routes/driverType');
var linePath = require('./routes/linePath');
var pathNode = require('./routes/pathNode');
var path = require('./routes/path');
var importer = require('./routes/importer');
var closestPathSolution = require('./routes/closestPathSolution');
var client = require('./routes/client');
var genSolution = require('./routes/geneticSolution');


module.exports = () => {
    const router = Router(); 
    
    node(router);
    line(router);
    vehicleType(router);
    driverType(router);
    linePath(router);
    pathNode(router);
    path(router);
    importer(router);
    closestPathSolution(router);
    client(router);
    genSolution(router);
    
    return router;
};