const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getAllLinePathsDTO = async () => {
    try {
        const dtoRoute = localhost + '/linePaths';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllLinePaths = async () => {
    try {
        const completeRoute = localhost + '/linePaths/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getLinePathById = async (id) => {
    try {
        const idRoute = localhost + '/linePaths/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postLinePath = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/linePaths';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { getAllLinePathsDTO: getAllLinePathsDTO, getAllLinePaths: getAllLinePaths, getLinePathById: getLinePathById, postLinePath: postLinePath };