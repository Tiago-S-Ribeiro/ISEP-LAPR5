var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinePath = new Schema({

    key: String,
    path: {type: Schema.Types.ObjectId, ref: 'Path'},
    orientation: {
        type: String,
        enum : ['Go','Return']
    }
});

module.exports = mongoose.model('LinePath', LinePath);