function pathDTO(path) {
    return {
        key: path.key,
        pathNodes: path.pathNodes
    }
}

module.exports.pathDTO = pathDTO;