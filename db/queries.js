const pool = require('./pool');

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users where username = $1', [
    username,
  ]);
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

module.exports = {
  getUserByUsername,
  getUsers,
  addUser,
};
