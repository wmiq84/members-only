const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db/pool'); 

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const { rows } = await pool.query(
				'SELECT * FROM members WHERE email = $1',
				[username]
			);
			const user = rows[0];

			if (!user) {
				return done(null, false, { message: 'Incorrect email' });
			}
			if (user.password !== password) {
				return done(null, false, { message: 'Incorrect password' });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query('SELECT * FROM members WHERE id = $1', [
			id,
		]);
		const user = rows[0];

		done(null, user);
	} catch (err) {
		done(err);
	}
});

module.exports = passport;