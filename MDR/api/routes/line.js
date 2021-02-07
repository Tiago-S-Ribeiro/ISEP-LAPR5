var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/lines', router);

    router.get('/', middlewares.getAllLinesUsingDTO, function (req, res) {
        return res.json({ lines: req.allLines }).status(200);
    });

    router.get('/complete', middlewares.attachAllLines, function (req, res) {
        return res.json({ lines: req.allLines }).status(200);
    });

    router.get('/:line_id', middlewares.attachLine, function (req, res){
        return res.json({ line: req.line }).status(200);
    });

    router.post('/', middlewares.createNewLine, function (req, res) {
        return res.json({ message: 'Line was successfully added.' }).status(201);
    });

    router.delete('/:line_id', middlewares.deleteLine, function (req, res){
        return res.json({ message: 'Line successfully deleted.' }).status(200);
    });

    router.put('/:line_id', middlewares.updateLine, function(req, res){
        return res.json({ message: 'Line successfully updated.'}).status(200);
    });

    router.get('/:line_id/pathsByLine', middlewares.pathsByLine, function (req, res){
        return res.json({ line: req.line }).status(200);
    });
};