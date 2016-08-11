var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/auth');
var tutorialsController = require('../controllers/tutorials');
var reviewsController = require('../controllers/reviews');

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

router.get('/:id/reviews/new', authMiddleware.isAuthenticated, 
           reviewsController.new);

router.post('/:id/reviews/', authMiddleware.isAuthenticated, 
            reviewsController.doCreate);

router.get('/:id/reviews/:review_id/edit', authMiddleware.checkReviewOwnership, 
           reviewsController.edit);

router.put('/:id/reviews/:review_id', authMiddleware.checkReviewOwnership, 
           reviewsController.doUpdate);

router.delete('/:id/reviews/:review_id', authMiddleware.checkReviewOwnership, 
              reviewsController.doDelete);

module.exports = router;