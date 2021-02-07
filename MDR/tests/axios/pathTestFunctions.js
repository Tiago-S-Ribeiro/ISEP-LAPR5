const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getPathsUsingDTO = async () => {
    try {
        const dtoRoute = localhost + '/paths';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllPaths = async () => {
    try {
        const completeRoute = localhost + '/paths/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getPathById = async (id) => {
    try {
        const idRoute = localhost + '/paths/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postPath = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/paths';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = {getPathsUsingDTO, getAllPaths, getPathById, postPath};