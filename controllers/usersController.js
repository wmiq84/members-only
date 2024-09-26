// controllers/usersController.js

const db = require('../db/queries');

async function sayHello(req, res) {
	console.log("Hello World!");
    res.render('index')
}

module.exports = {
    sayHello,
};