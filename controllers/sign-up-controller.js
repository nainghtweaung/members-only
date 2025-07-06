const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const { validationResult, body } = require('express-validator');

const { MEMBER_PASSWORD, salt } = require('../constants');

module.exports = {
  signUpGet: (req, res) => {
    res.render('sign-up', {
      title: 'Sign up',
      fullname: null,
      username: null,
      password: null,
      confirmPassword: null,
      errors: null,
    });
  },
  signUpPost: async (req, res) => {
    try {
      const { fullname, username, password, confirmPassword } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        res.render('sign-up', {
          title: 'Sign up',
          fullname,
          username,
          errors: errors.mapped(),
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.addUser(fullname, username, hashedPassword);
        const users = await db.getUsers();
        console.log(users);
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getMessages: async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.end();
  },
  getJoinMembership: async (req, res) => {
    res.render('join-membership', { title: 'Join Membership' });
  },
  postJoinMembership: async (req, res) => {
    try {
      if (MEMBER_PASSWORD === req.body.joinPassword) {
        console.log(req.body.joinPassword);
        res.sendStatus(200);
      }
      res.sendStatus(401);
    } catch (error) {
      console.log(error);
    }
  },
};
