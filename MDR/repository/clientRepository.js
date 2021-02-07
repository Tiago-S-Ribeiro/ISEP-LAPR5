var Client = require('../models/client');

function registerNewClient(client) {
    try {
        client.save();
        return client;
    } catch (err) {
        throw err;
    }
}

function findAllClients(){
    var allClients = Client.find(function (err) {
        if (err) {
            throw err;
        }
    });
    return allClients;
}

module.exports.registerNewClient = registerNewClient;
module.exports.findAllClients = findAllClients;