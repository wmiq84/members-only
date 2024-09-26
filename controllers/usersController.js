// controllers/usersController.js

const db = require('../db/queries');

async function createSignIn(req, res) {
    const temp = await db.getMessages();
	res.render('index', { user: req.user, messages: temp, });
}

async function createSignUp(req, res) {
	res.render('sign-up-form');
}

async function signUpUser(req, res, next) {
	try {
		await db.addUser(req.body); // Pass only the necessary data
		res.redirect('/');
	} catch (err) {
		return next(err);
	}
}

async function logOutUser(req, res, next) {
	console.log('log out test');
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
}

async function createMemberForm(req, res) {
	res.render('member-form');
}

async function signUpMember(req, res) {
	secretCode = 'orange';
    if (req.query.email) { 
        const email = req.query.email;
        if (req.body.code === 'orange') {
            db.createMember(email);
            res.redirect('/');
        }
    }
}

async function createMessageForm(req, res) {
	res.render('message-form');
}

async function createMessagePost(req, res) {
    await db.createMessage(req.body, req.query.id);
    res.redirect('/');
}

module.exports = {
	createSignIn,
	createSignUp,
	signUpUser,
	logOutUser,
	createMemberForm,
    signUpMember,
    createMessageForm,
    createMessagePost,
};
