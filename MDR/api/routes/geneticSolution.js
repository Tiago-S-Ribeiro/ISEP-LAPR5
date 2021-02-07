var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/geneticSolutions', router);

    router.get('/', middlewares.attachAllGenSolutions, function (req, res) {
        return res.json({ allGenSolutions: req.allGenSolutions }).status(200);
    });

    router.post('/', middlewares.postGenSolution, function (req, res) {
        return res.json({ message: 'genetic Solution was successfully posted.' }).status(201);
    });
};