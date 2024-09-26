const pool = require('./pool');
const bcrypt = require('bcryptjs');

async function addUser(userData) {
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	await pool.query(
		'INSERT INTO members (name, password, email, status) VALUES ($1, $2, $3, $4)',
		[userData.name, hashedPassword, userData.email, false]
	);
}

async function createMember(name) {
    await pool.query(
        'UPDATE members SET status = $1 WHERE name = $2',
        [true, name]
    );
}

async function createMessage(userData, userId) {
	const currentTime = new Date(); 
	await pool.query(
		'INSERT INTO messages (title, text, time, user_id) VALUES ($1, $2, $3, $4)',
		[userData.title, userData.text, currentTime, userId]
	);
}

module.exports = {
	addUser,
	createMember,
	createMessage,
};
