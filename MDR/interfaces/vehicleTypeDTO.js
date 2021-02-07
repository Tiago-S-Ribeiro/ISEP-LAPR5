function vehicleTypeDTO(vehicleType) {
    return {
        key: vehicleType.key,
        name: vehicleType.name,
        vehicles: vehicleType.vehicles
    }
}

module.exports.vehicleTypeDTO = vehicleTypeDTO;