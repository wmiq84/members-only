#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const SQL = `
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (255),
  password VARCHAR (255),
  email VARCHAR (255) UNIQUE,
  status BOOL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR (255),
  text VARCHAR (255),
  time TIMESTAMP,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES members(id)
);

INSERT INTO members (name, password, email, status) 
VALUES
  ('Haruki Murakami', 'password123', 'haruki@example.com',  true),
  ('Alexandre Dumas', 'password123', 'alexandre@example.com', true),
  ('Stephen King', 'password123', 'stephen@example.com', true);

INSERT INTO messages (title, text, time, user_id) 
VALUES
  ('First Message', 'This is the first message.', NOW(), 1),
  ('Second Message', 'This is the second message.', NOW(), 2),
  ('Third Message', 'This is the third message.', NOW(), 3);
`;

async function main() {
	const dbUrl = process.argv[2] || process.env.DATABASE_URL;

	console.log('seeding...');
	const client = new Client({
		connectionString: dbUrl,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main().catch((err) => console.error(err.stack));
