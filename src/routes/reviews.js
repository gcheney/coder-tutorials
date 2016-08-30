var express = require('express');
var router = express.Router();
var authMiddleware = require('../middleware/auth');
var reviewsController = require('../controllers/reviews');

router.get('/new', authMiddleware.isAuthenticated, 
           reviewsController.new);

router.post('/', authMiddleware.isAuthenticated, 
            reviewsController.create);

router.get('/:review_id/edit', authMiddleware.checkReviewOwnership, 
           reviewsController.edit);

router.put('/:review_id', authMiddleware.checkReviewOwnership, 
           reviewsController.update);

router.delete('/:review_id', authMiddleware.checkReviewOwnership, 
              reviewsController.delete);

module.exports = router;