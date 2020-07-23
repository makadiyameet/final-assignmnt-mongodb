const Review = require('../models/review.model');
const Event = require('../models/event.model');

exports.getReviews = (req, res, next) => {
    Review.find({ event: req.params.eventId })
    .then(reviews => res.json(reviews))
    .catch(err => next(err));
};
exports.getReview = (req, res, next) => {
    Review.findById(req.params.reviewId)
    .then(review => res.json(review))
    .catch(err => next(err));
};
exports.createReview = (req, res, next) => {
    Event.findById(req.params.eventId)
    .then(event => {
        if (!event) {
            const err = new Error('Event ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        } else {
            req.body.author = req.user._id;
            req.body.event = req.params.eventId;
            return Review.create(req.body);
        }
    })
    .then(review => res.json(review))
    .catch(err => next(err));
};
exports.updateReview = (req, res, next) => {
    Review.findById(req.params.reviewId)
    .then(review => {
        if (!review) {
            const err = new Error('Review ' + req.params.reviewId + ' not found');
            err.status = 404;
            return next(err);
        }
        if (!review.author.equals(req.user._id)) {
            err = new Error('You are not authorized to update this review!');
            err.status = 403;
            return next(err);
        }
        if (req.body.rating) {
            review.rating = req.body.rating;
        }
        if (req.body.review) {
            review.review = req.body.review;          
        }
        return review.save();
    })
    .then(review => res.json(review))
    .catch(err => next(err));
};
exports.deleteReview = (req, res, next) => {
    Review.findById(req.params.reviewId)
    .then(review => {
        if (!review) {
            const err = new Error('Review ' + req.params.reviewId + ' not found');
            err.status = 404;
            return next(err);
        }
        if (!review.author.equals(req.user._id)) {
            err = new Error('You are not authorized to delete this review!');
            err.status = 403;
            return next(err);
        }
        return review.remove();
    })
    .then(resp => res.json(resp))
    .catch(err => next(err));
};
