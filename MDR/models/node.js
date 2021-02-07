// var {INode} = require('../interfaces/INode');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Node = new Schema({

    key: {type: String, unique: true},
    name: String,
    latitude: Number,
    longitude: Number,
    shortName: {type: String, unique: true},
    isDepot: Boolean,
    isReliefPoint: Boolean
});

module.exports = mongoose.model('Node', Node);