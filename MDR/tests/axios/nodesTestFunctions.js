const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getAllNodesDTO = async () => {
    try {
        const dtoRoute = localhost + '/nodes';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllNodes = async () => {
    try {
        const completeRoute = localhost + '/nodes/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getNodeById = async (id) => {
    try {
        const idRoute = localhost + '/nodes/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postNode = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/nodes';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { getAllNodesDTO, getAllNodes, getNodeById, postNode };