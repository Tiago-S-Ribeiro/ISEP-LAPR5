function nodeDTO(node) {
    return {
        key: node.key,
        name: node.name,
        shortName: node.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint
    }
}

module.exports.nodeDTO = nodeDTO;