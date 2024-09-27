const pool = require('./pool');
const bcrypt = require('bcryptjs');

async function addUser(userData) {
	const hashedPassword = await bcrypt.hash(userData.password, 10);
	const admin = userData.admin === 'on';
	await pool.query(
		'INSERT INTO members (name, password, email, status, admin) VALUES ($1, $2, $3, $4, $5)',
		[userData.name, hashedPassword, userData.email, false, admin]
	);
}

async function createMember(name) {
	await pool.query('UPDATE members SET status = $1 WHERE name = $2', [
		true,
		name,
	]);
}

async function createMessage(userData, userId) {
	const currentTime = new Date();
	await pool.query(
		'INSERT INTO messages (title, text, time, user_id) VALUES ($1, $2, $3, $4)',
		[userData.title, userData.text, currentTime, userId]
	);
	await pool.query(
		`UPDATE messages 
         SET member = members.name 
         FROM members 
         WHERE messages.user_id = members.id 
         AND messages.user_id = $1`,
		[userId]
	);
}

async function getMessages() {
	const result = await pool.query('SELECT * FROM messages');
	return result.rows;
}

async function getUsers() {
	const result = await pool.query('SELECT * FROM users');
	return result.rows;
}

async function deleteMessage(id) {
	console.log("SAD")
	await pool.query(
        'DELETE FROM messages WHERE id = $1',
        [id]	
	);
}

// async function deleteBook(book, genre) {
// 	const genreCount = await pool.query('SELECT COUNT(*) FROM genres WHERE genre = $1', [genre]);
// 	const genreCountInt = parseInt(genreCount.rows[0].count, 10);

// 	await pool.query('DELETE FROM books WHERE BOOK = $1', [book]);
// 	if (genreCountInt === 1) {
// 		await pool.query('DELETE FROM genres WHERE GENRE = $1', [genre]);
// 	}
// }

module.exports = {
	addUser,
	createMember,
	createMessage,
	getMessages,
	getUsers,
	deleteMessage,
};
