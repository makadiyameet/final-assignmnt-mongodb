const User = require('../models/user.model');
const passport = require('passport');
const auth = require('../middlewares/auth.middleware');

exports.getUsers = (req, res, next) => {
    User.find({})
    .then((users) => {
        res.json(users);
    })
    .catch((err) => next(err));
};

exports.signUp = (req, res, next) => {
    const { username, password, displayName } = req.body;
    User.register(new User({ username, displayName }), password)
    .then(user => user.save())
    .then(_ => passport.authenticate('local')(req, res))
    .then(_ => {
        res.json({
            success: true,
            status: 'Registration Successful!'
        });
    })
    .catch(err => {
        res.status(500).json({ err });
    })
};

exports.login = (req, res) => {
    const token = auth.getToken({ _id: req.user._id });

    return res.json({
        success: true,
        token: token,
        status: 'You arre successfully logged in!'
    });
}