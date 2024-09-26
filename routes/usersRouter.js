// routes/usersRouter.js
const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require('../auth');

usersRouter.get('/', usersController.createSignIn);
usersRouter.get('/new', usersController.createSignUp);
usersRouter.post('/new', usersController.signUpUser);
usersRouter.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
);
usersRouter.get('/log-out', usersController.logOutUser);
usersRouter.get('/secret', usersController.createMemberForm);
usersRouter.post('/secret', usersController.signUpMember);
usersRouter.get('/message', usersController.createMessageForm);
usersRouter.post('/message', usersController.createMessagePost);

module.exports = usersRouter;
