const pool = require('./pool');
const bcrypt = require('bcryptjs');

// async function addUser(req, res) {
// 	const hashedPassword = await bcrypt.hash(req.body.password, 10);
// 	await pool.query(
// 		'INSERT INTO members (name, password, email, status) VALUES ($1, $2, $3, $4)',
// 		[req.body.name, hashedPassword, req.body.email, false]
// 	);
// }

async function addUser(userData) {
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	await pool.query(
		'INSERT INTO members (name, password, email, status) VALUES ($1, $2, $3, $4)',
		[userData.name, hashedPassword, userData.email, false]
	);
}

module.exports = {
	addUser,
};
