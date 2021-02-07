const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getAllLinesDTO = async () => {
    try {
        const dtoRoute = localhost + '/lines';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllLines = async () => {
    try {
        const completeRoute = localhost + '/lines/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getLineById = async (id) => {
    try {
        const idRoute = localhost + '/lines/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postLine = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/lines';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { getAllLinesDTO, getAllLines, getLineById, postLine };