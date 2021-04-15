const express = require('express');
const router = express.Router();
const imagenController = require('../controllers/imagenController');

module.exports = function() {
    router.get('/upload', 
    imagenController.upload
    );
    
    return router;
}
 