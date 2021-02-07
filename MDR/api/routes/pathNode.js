var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/pathNodes', router);

    router.get('/', middlewares.getAllPathNodesUsingDTO, function (req, res) {
        return res.json({ pathNodes: req.allPathNodes }).status(200);
    });

    router.get('/complete', middlewares.attachAllPathNodes, function (req, res) {
        return res.json({ pathNodes: req.allPathNodes }).status(200);
    });

    router.get('/:pathNode_id', middlewares.attachPathNode, function (req, res){
        return res.json({ pathNode: req.pathNode }).status(200);
    });

    router.post('/', middlewares.createNewPathNode, function (req, res) {
        return res.json({ message: 'Path Node was successfully added.' }).status(201);
    });

    router.delete('/:pathNode_id', middlewares.deletePathNode, function (req, res){
        return res.json({ message: 'Path Node successfully deleted.' }).status(200);
    });

    router.put('/:pathNode_id', middlewares.updatePathNode, function(req, res){
        return res.json({ message: 'Path Node successfully updated.'}).status(200);
    });
};