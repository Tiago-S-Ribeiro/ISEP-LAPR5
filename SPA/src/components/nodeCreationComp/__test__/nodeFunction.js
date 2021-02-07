const axios = require("axios");

const localHost = "127.0.0.1:6700";

const postNode = async (postBody) => {
    try {
        if (postBody == null) throw new Error('Null Post Body');
        const postRoute = localHost.concat("/nodes");
        const result = await axios.post(postRoute, postBody);
        return result;
    } catch (err) {
        return new Map();
    }
};

module.exports = { postNode };