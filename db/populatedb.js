#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const SQL = `
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS genres;

CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  book VARCHAR (255),
  genre_id INTEGER,
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

INSERT INTO authors (author) 
VALUES
  ('Haruki Murakami'),
  ('Alexandre Dumas'),
  ('Stephen King');

INSERT INTO genres (genre) 
VALUES
  ('Magical realism'),
  ('Adventure'),
  ('Post-apocalyptic');

INSERT INTO books (book, genre_id) 
VALUES
  ('Kafka On The Shore', 1), -- Magical realism
  ('The Count of Monte Cristo', 2), -- Adventure
  ('The Stand', 3); -- Post-apocalyptic
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