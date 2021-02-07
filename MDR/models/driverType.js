var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriverType = new Schema({

    key: {type: String, unique: true},
    name: String,
    description: String
});

module.exports = mongoose.model('DriverType', DriverType);