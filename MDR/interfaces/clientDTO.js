function clientDTO(client) {
    return {
        name: client.password,
        email: client.email
    }
}

module.exports.clientDTO = clientDTO;