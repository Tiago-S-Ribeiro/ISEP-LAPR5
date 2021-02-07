const axios = require("axios");

const localHost = "127.0.0.1:6700";

const postPath = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localHost.concat("/paths");
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { postPath };