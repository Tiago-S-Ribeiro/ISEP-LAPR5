var mongooseLoader = require('./mongoose');
var expressLoader = require('./express');

module.exports = async ({expressApp}) => {
    await mongooseLoader();
    await expressLoader({appLoader : expressApp});
};