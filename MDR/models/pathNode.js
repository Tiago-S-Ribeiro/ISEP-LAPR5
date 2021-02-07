var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PathNode = new Schema({

    key: String,
    node: {type: Schema.Types.ObjectId, ref: 'Node'},
    duration: Number,
    distance: Number
});

module.exports = mongoose.model('PathNode', PathNode);