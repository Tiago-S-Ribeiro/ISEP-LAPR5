const axios = require('axios');
var config = require('../../config');
var localhost = config.ip_test;

const getAllVehicleTypesDTO = async () => {
    try {
        const dtoRoute = localhost + '/vehicleTypes';
        const result = await axios.get(dtoRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getAllVehicleTypes = async () => {
    try {
        const completeRoute = localhost + '/vehicleTypes/complete';
        const result = await axios.get(completeRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const getVehicleTypeById = async (id) => {
    try {
        const idRoute = localhost + '/vehicleTypes/' + id;
        const result = await axios.get(idRoute);
        return result;
    } catch (err) {
        return new Map();
    }
};

const postVehicleType = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localhost + '/vehicleTypes';
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { getAllVehicleTypesDTO, getAllVehicleTypes, getVehicleTypeById, postVehicleType };