const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const User = require('../models/user.model');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const jwtSecret = process.env.JWT_SECRET;

exports.getToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        expiresIn: 3600
    });
}

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}
exports.jwtPassport = passport.use(new JwtStrategy(
    options,
    (payload, done) => {
        User.findOne({ _id: payload._id })
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(error => done(error, false));
    }
));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
    if (!req.user.admin) {
        const err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        next(err);
    }
    next();
}
