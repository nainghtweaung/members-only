const pool = require('./pool');

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users where username = $1', [
    username,
  ]);
  console.log('User:', rows);
  return rows;
}

async function getUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

async function addUser(fullname, username, password) {
  await pool.query(
    'INSERT INTO users(fullname, username, password) VALUES($1, $2, $3)',
    [fullname, username, password]
  );
}

async function addNewMessage(title, text, userid) {
  const date = new Date();
  await pool.query(
    'INSERT INTO messages(title, text,date, userid) VALUES ($1, $2, $3, $4)',
    [title, text, date, userid]
  );
}

async function getUsersMessages() {
  const { rows } = await pool.query(
    'SELECT * FROM users JOIN messages ON users.id = messages.userid'
  );
  return rows;
}

async function deleteMessage(id) {
  await pool.query('DELETE FROM messages WHERE id = $1', [id]);
}

module.exports = {
  getUserByUsername,
  getUsers,
  addUser,
  addNewMessage,
  getUsersMessages,
  deleteMessage,
};
