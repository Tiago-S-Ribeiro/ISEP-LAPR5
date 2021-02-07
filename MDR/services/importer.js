const convert = require('xml-js');
const Node = require('../models/node');
var LinePath = require('../models/linePath');
var PathNode = require('../models/pathNode');
var Path = require('../models/path');
var Line = require('../models/line');
var VehicleType = require('../models/vehicleType');

const importFile = async (req, res, next) => {

    var jsonConverted = JSON.parse(convert.xml2json(req.file.buffer.toString(), { compact: true, spaces: 4, alwaysChildren: true }));

    var nodesDictionary = {};
    var pathNodesArray = [];
    var linePathsArray = [];
    var pathsDictionary = {};

    await (jsonConverted.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.Nodes.Node.map(async node => {

        var newNode = new Node();
        newNode.key = node._attributes.key;
        newNode.name = node._attributes.Name;
        newNode.latitude = node._attributes.Latitude;
        newNode.longitude = node._attributes.Longitude;
        newNode.shortName = node._attributes.ShortName;
        newNode.isDepot = node._attributes.IsDepot.toString().toLowerCase();
        newNode.isReliefPoint = node._attributes.IsReliefPoint.toString().toLowerCase();

        nodesDictionary[newNode.key] = newNode._id;

        newNode.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    }));

    await Promise.all(jsonConverted.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.Paths.Path.map(path => {

        pathNodesArray = [];
        
        Promise.all(path.PathNodes.PathNode.map(pathNode => {

            var newPathNode = new PathNode();
            newPathNode.key = pathNode._attributes.key;
            newPathNode.node = nodesDictionary[pathNode._attributes.Node];
            newPathNode.duration = pathNode._attributes.Duration;
            newPathNode.distance = pathNode._attributes.Distance;

            pathNodesArray.push(newPathNode._id);

            newPathNode.save(function (err) {
                if (err) {
                    return next(err);
                }
            });
        }));
        
        var newPath = new Path();
        newPath.key = path._attributes.key;
        newPath.isEmpty = path._attributes.IsEmpty.toString().toLowerCase();
        Object.assign(newPath.pathNodes, pathNodesArray);

        pathsDictionary[newPath.key] = newPath._id;

        newPath.save(function (err) {
            if (err) {
                return next(err);
            }
        });

        
    })).then(async () => {

        await (jsonConverted.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.Lines.Line.map(line => {

            linePathsArray = [];
            Promise.all(line.LinePaths.LinePath.map(linePath => {

                var newLinePath = new LinePath();
                newLinePath.key = linePath._attributes.key;
                newLinePath.path = pathsDictionary[linePath._attributes.Path];
                newLinePath.orientation = linePath._attributes.Orientation;

                linePathsArray.push(newLinePath._id);

                newLinePath.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                });
            }));

            var newLine = new Line();
            newLine.key = line._attributes.key;
            newLine.name = line._attributes.Name;
            newLine.color = line._attributes.Color.slice(4, line._attributes.Color.length - 1).split(',');
            Object.assign(newLine.linePaths, linePathsArray);
                
            newLine.save(function (err) {
                if (err) {
                    return next(err);
                }
            });
        }));
    });

    await (jsonConverted.GlDocumentInfo.world.GlDocument.GlDocumentNetwork.Network.VehicleTypes.VehicleType.map(async vehicleType => {

        var newVehicleType = new VehicleType();
        newVehicleType.key = vehicleType._attributes.key;
        newVehicleType.name = vehicleType._attributes.Name;
        newVehicleType.autonomy = vehicleType._attributes.Autonomy;
        newVehicleType.cost = vehicleType._attributes.Cost;
        newVehicleType.averageSpeed = vehicleType._attributes.AverageSpeed;
        newVehicleType.energySource = vehicleType._attributes.EnergySource;
        newVehicleType.consumption = vehicleType._attributes.Consumption;
        newVehicleType.emissions = vehicleType._attributes.Emissions;

        newVehicleType.save(function (err) {
            if (err) {
                return next(err);
            }
        });
    }));

    return next();
};

module.exports.importFile = importFile;