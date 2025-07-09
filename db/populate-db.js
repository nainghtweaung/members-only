const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT FALSE);
  
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(500) NOT NULL,
  text TEXT NOT NULL,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
  userid INTEGER REFERENCES users(id) ON DELETE CASCADE);
  `;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to the database');

    await client.query(SQL);
    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

main();
