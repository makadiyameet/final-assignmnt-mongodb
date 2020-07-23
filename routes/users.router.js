const { Router } = require('express');
const passport = require('passport');
const UsersController = require('../controllers/users.controller');
const auth = require('../middlewares//auth.middleware');

const router = new Router();

router.get('/', [
    auth.verifyUser,
    auth.verifyAdmin
], UsersController.getUsers);

router.post('/signup', UsersController.signUp);

router.post('/login', passport.authenticate('local'), UsersController.login);

module.exports = router;