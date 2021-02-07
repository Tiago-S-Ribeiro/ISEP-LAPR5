//Este file é responsavel por criar e exportar a connection à BD, a dbURL é obtida no config
var mongoose = require('mongoose');
var config = require('../config');

module.exports = async () => { 
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};