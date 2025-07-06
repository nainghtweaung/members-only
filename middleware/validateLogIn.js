const { body } = require('express-validator');
const db = require('../db/queries');

const validateLogIn = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .custom(async (username) => {
      const user = await db.getUserByUsername(username);

      if (user.length === 0) {
        throw new Error('Username does not exist.');
      }
      return;
    }),
  body('password').trim().notEmpty().withMessage('Password is required.'),
];
