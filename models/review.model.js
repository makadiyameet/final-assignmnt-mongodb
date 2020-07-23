const { Schema, model, Types } = require('mongoose');

const reviewSchema = Schema({
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: Types.ObjectId,
        ref: 'Event'
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        default: ''
    }
});

module.exports = model('Review', reviewSchema);