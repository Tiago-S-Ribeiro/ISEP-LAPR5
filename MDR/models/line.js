var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Line = new Schema({

    key: {type: String, unique: true},
    name: {type: String, unique: true},
    color: [Number],
    linePaths: [{type: Schema.Types.ObjectId, ref: 'LinePath'}]
});

module.exports = mongoose.model('Line', Line);