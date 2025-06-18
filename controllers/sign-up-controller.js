const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const { validationResult } = require('express-validator');

module.exports = {
  signUpGet: (req, res) => {
    res.render('sign-up', {
      title: 'Sign up',
      fullname: null,
      username: null,
      password: null,
      confirmPassword: null,
    });
  },
  signUpPost: async (req, res) => {
    const { fullname, username, password, confirmPassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      res.render('sign-up', { title: 'Sign up', fullname, username });
    } else {
      await db.addUser(fullname, username, password);
      const users = await db.getUsers();
      console.log(users);
      res.sendStatus(200);
    }
  },
  getMessages: async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.end();
  },
};
