const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getAllDriverTypesDTO = async () => {
    try {
        const dtoRoute = localhost + '/driverTypes';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllDriverTypes = async () => {
    try {
        const completeRoute = localhost + '/driverTypes/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getDriverTypeById = async (id) => {
    try {
        const idRoute = localhost + '/driverTypes/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postDriverType = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/driverTypes';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { getAllDriverTypesDTO, getAllDriverTypes, getDriverTypeById, postDriverType };