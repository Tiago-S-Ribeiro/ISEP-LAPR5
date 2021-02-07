const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getAllPathNodesDTO = async () => {
    try {
        const dtoRoute = localhost + '/pathNodes';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllPathNodes = async () => {
    try {
        const completeRoute = localhost + '/pathNodes/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getPathNodeById = async (id) => {
    try {
        const idRoute = localhost + '/pathNodes/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postPathNode = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/pathNodes';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = {getAllPathNodesDTO, getAllPathNodes, getPathNodeById, postPathNode};