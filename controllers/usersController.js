// controllers/usersController.js

const db = require('../db/queries');
const pool = require('../db/pool');

async function createSignIn(req, res) {
	res.render('index', { user: req.user });
}

async function createSignUp(req, res) {
	res.render('sign-up-form');
}

async function signUpUser(req, res, next) {
	try {
		console.log('start');
		await pool.query(
			'INSERT INTO members (name, password, email, status) VALUES ($1, $2, $3, $4)',
			[req.body.name, req.body.password, req.body.email, true]
		);
		res.redirect('/');
		console.log('end');
	} catch (err) {
		return next(err);
	}
}

async function logOutUser(req, res, next) {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
}

module.exports = {
	createSignIn,
	createSignUp,
	signUpUser,
	logOutUser,
};
