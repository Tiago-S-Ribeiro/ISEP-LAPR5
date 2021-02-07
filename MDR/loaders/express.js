var bodyParser = require('body-parser');
var routes = require('../api');
var cors = require('cors')

module.exports = ({appLoader}) => {
    appLoader.use(cors());
    appLoader.use(bodyParser.json());
    appLoader.use(routes());
};