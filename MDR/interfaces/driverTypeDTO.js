function driverTypeDTO(driverType) {
    return {
        key: driverType.key,
        name: driverType.name,
        description: driverType.description
    }
}

module.exports.driverTypeDTO = driverTypeDTO;