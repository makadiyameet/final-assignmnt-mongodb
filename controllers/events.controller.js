const Event = require('../models/event.model');

exports.getEvents = (req, res, next) => {
    Event.find({})
    .then(events => res.json(events))
    .catch(err => next(err));
};
exports.getEvent = (req, res, next) => {
    Event.findById(req.params.eventId)
    .then((event) => {
        if (!event) {
            return res.status(404).send();
        } else {
            return res.json(event);
        }
    }).catch((err) => next(err));
};
exports.createEvent = (req, res, next) => {
    const event = new Event(req.body);
    event.save()
    .then((event) => res.json(event))
    .catch(err => next(err));
}
exports.updateEvent = (req, res, next) => {
    Event.findByIdAndUpdate(req.params.eventId, {
        $set: req.body
    }, { new: true })
    .then(event => res.json(event))
    .catch(err => next(err));
};
exports.deleteEvent = (req, res, next) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(resp => res.json(resp))
    .catch(err => next(err));
};