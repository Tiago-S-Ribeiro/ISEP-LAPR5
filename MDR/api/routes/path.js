var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/paths', router);

    router.get('/', middlewares.getPathsUsingDTO, function (req, res) {
        return res.json({ paths: req.allPaths }).status(200);
    });

    router.get('/complete', middlewares.attachAllPaths, function (req, res) {
        return res.json({ paths: req.allPaths }).status(200);
    });

    router.get('/:path_id', middlewares.attachPath, function (req, res){
        return res.json({ path: req.thisPath }).status(200);
    });

    router.post('/', middlewares.createNewPath, function (req, res) {
        return res.json({ message: 'Path was successfully added.' }).status(201);
    });

    router.delete('/:path_id', middlewares.deletePath, function (req, res){
        return res.json({ message: 'Path successfully deleted.' }).status(200);
    });

    router.put('/:path_id', middlewares.updatePath, function(req, res){
        return res.json({ message: 'Path successfully updated.'}).status(200);
    });
};