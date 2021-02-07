var { Router } = require('express');
var router = Router();
var importer = require('../../services/importer');
var multer = require('multer');
var upload = multer();
module.exports = (app) => {

    app.use('/importer', router);
    
    router.post('/', upload.single('file'), importer.importFile, function (req, res) {
        return res.json({message: 'File was successfully imported.'}).status(201);
    });

};