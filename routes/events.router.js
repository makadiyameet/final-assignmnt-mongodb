const { Router } = require('express');
const EventsController = require('../controllers/events.controller');
const ReviewsController = require('../controllers/reviews.controller');
const { notSupported } = require('../middlewares/unsupported.middleware');
const { verifyUser, verifyAdmin } = require('../middlewares/auth.middleware');

const router = Router();

router.route('/')
.get(EventsController.getEvents)
.post(verifyUser, verifyAdmin, EventsController.createEvent)
.put(notSupported)
.delete(notSupported);

router.route('/:eventId')
.get(EventsController.getEvent)
.post(notSupported)
.put(verifyUser, verifyAdmin, EventsController.updateEvent)
.delete(verifyUser, verifyAdmin, EventsController.deleteEvent);

router.route('/:eventId/reviews')
.get(ReviewsController.getReviews)
.post(verifyUser, ReviewsController.createReview)
.put(notSupported)
.delete(notSupported);

router.route('/:eventId/reviews/:reviewId')
.get(ReviewsController.getReview)
.post(notSupported)
.put(verifyUser, ReviewsController.updateReview)
.delete(verifyUser, ReviewsController.deleteReview);

module.exports = router;