function lineDTO(line) {
    return {
        key: line.key,
        name: line.name,
        linePaths: line.linePaths
    }
}

module.exports.lineDTO = lineDTO;