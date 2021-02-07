var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/nodes', router);
    
    router.get('/', middlewares.getAllNodesUsingDTO, function (req, res) {
        return res.json({ nodes: req.allNodes }).status(200);
    });

    router.get('/complete', middlewares.attachAllNodes, function (req, res) {
        return res.json({ nodes: req.allNodes }).status(200);
    });

    router.get('/:node_id', middlewares.attachNode, function (req, res){
        return res.json({ node: req.node }).status(200);
    });

    router.post('/', middlewares.createNewNode, function (req, res) {
        return res.json({ message: 'Node was successfully added.' }).status(201);
    });

    router.delete('/:node_id', middlewares.deleteNode, function (req, res){
        return res.json({ message: 'Node successfully deleted.' }).status(200);
    });
    
    router.put('/:node_id', middlewares.updateNode, function(req, res){
        return res.json({ message: 'Node successfully updated.'}).status(200);
    });

};