var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleType = new Schema({

    key: {type: String, unique: true},
    name: String,
    autonomy: Number,
    cost: Number,
    averageSpeed: Number,
    energySource: Number,
    consumption: Number,
    emissions: Number,
    vehicles: [{type: Schema.Types.ObjectId, ref: 'Vehicle'}]
});

module.exports = mongoose.model('VehicleType', VehicleType);