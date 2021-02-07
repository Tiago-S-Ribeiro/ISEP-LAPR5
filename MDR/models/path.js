var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Path = new Schema({

    key: {type: String, unique: true},
    isEmpty: Boolean,
    pathNodes: [{type: Schema.Types.ObjectId, ref: 'pathNode'}]
});

module.exports = mongoose.model('Path', Path);