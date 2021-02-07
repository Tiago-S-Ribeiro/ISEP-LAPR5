var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

     app.use('/linePaths', router);

    router.get('/', middlewares.getAllLinePathsUsingDTO, function (req, res) {
        return res.json({ linePaths: req.allLinePaths }).status(200);
    });

    router.get('/complete', middlewares.attachAllLinePaths, function (req, res) {
        return res.json({ linePaths: req.allLinePaths }).status(200);
    });

    router.get('/:linePath_id', middlewares.attachLinePath, function (req, res){
        return res.json({ linePath: req.linePath }).status(200);
    });

    router.post('/complete', middlewares.createNewLinePath, function (req, res) {
        return res.json({ message: 'Line Path was successfully added.' }).status(201);
    });

    router.post('/', middlewares.createNewStandardLinePath, function (req, res) {
        return res.json({ message: 'Line Path was successfully added.' }).status(201);
    });

    router.delete('/:linePath_id', middlewares.deleteLinePath, function (req, res){
        return res.json({ message: 'Line Path successfully deleted.' }).status(200);
    });
};