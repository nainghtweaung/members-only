const { body } = require('express-validator');
const db = require('../db/queries');

const validateSignUp = [
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
    .custom((password, { req }) => password === req.body.confirmPassword)
    .withMessage('Passwords do not match'),
  body('username')
    .trim()
    .custom(async (username) => {
      const user = await db.getUserByUsername(username);

      if (user.length > 0) {
        throw new Error('Username is already in use.');
      }
    }),
];

module.exports = validateSignUp;
