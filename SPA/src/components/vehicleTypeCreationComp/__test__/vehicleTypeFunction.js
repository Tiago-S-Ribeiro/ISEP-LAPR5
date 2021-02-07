const axios = require("axios");

const localHost = "127.0.0.1:6700";

const postVT = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localHost.concat("/vehicleTypes");
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { postVT };