var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/auth');
var tutorialsController = require('../controllers/tutorials');

router.get('/', tutorialsController.index); 

router.get('/search', tutorialsController.search);

router.get('/create', authMiddleware.isAuthenticated, 
           tutorialsController.create);

router.post('/', authMiddleware.isAuthenticated, 
            tutorialsController.doCreate);

router.get('/:id', tutorialsController.view);

router.get('/:id/edit', authMiddleware.checkTutorialOwnership, 
           tutorialsController.edit);

router.put('/:id', authMiddleware.checkTutorialOwnership, 
           tutorialsController.doUpdate);

router.delete('/:id', authMiddleware.checkTutorialOwnership, 
              tutorialsController.doDelete);

module.exports = router;