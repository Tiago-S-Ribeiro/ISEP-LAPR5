var { Router } = require('express');
var router = Router();
var middlewares = require('../middlewares');

module.exports = (app) => {

    app.use('/closestPath', router);

    router.get('/', middlewares.attachAllSolutions, function (req, res) {
        return res.json({ allSolutions: req.allSolutions }).status(200);
    });

    router.post('/', middlewares.postClosestPathSolution, function (req, res) {
        return res.json({ message: 'Solution was successfully posted.' }).status(201);
    });
};