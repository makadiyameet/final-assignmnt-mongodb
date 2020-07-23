const { Types, Schema, model } = mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = Types.Currency;

const locationSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
});

const contactInfoSchema = Schema({
    telephone: {
        type: String
    },
    email: {
        type: String
    }
});

const eventSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: locationSchema,
    image: {
        type: String,
        default: ''
    },
    date:  {
        type: Date
    },
    entranceCost: {
        type: Currency
    },
    contactInfo: contactInfoSchema
});

module.exports = model('Event', eventSchema);