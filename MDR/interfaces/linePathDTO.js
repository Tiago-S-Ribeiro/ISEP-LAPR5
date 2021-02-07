function linePathDTO(linePath) {
    return {
        key: linePath.key,
        path: linePath.path,
        orientation: linePath.orientation
    }
}

module.exports.linePathDTO = linePathDTO;