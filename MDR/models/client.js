var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Client = new Schema({
    name: {
        type: String,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 8
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Client', Client);