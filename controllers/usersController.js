// controllers/usersController.js

const db = require('../db/queries');
const pool = require('../db/pool');
const bcrypt = require('bcryptjs');

async function createSignIn(req, res) {
	res.render('index', { user: req.user });
    console.log(req.user);
}

async function createSignUp(req, res) {
	res.render('sign-up-form');
}

async function signUpUser(req, res, next) {
	try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await pool.query(
			'INSERT INTO members (name, password, email, status) VALUES ($1, $2, $3, $4)',
			[req.body.name, hashedPassword, req.body.email, true]
		);
		res.redirect('/');
	} catch (err) {
		return next(err);
	}
}

async function logOutUser(req, res, next) {
    console.log("log out test")
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
