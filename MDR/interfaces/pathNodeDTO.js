function pathNodeDTO(pathNode) {
    return {
        node: pathNode.node,
        duration: pathNode.duration,
        distance: pathNode.distance
    }
}

module.exports.pathNodeDTO = pathNodeDTO;