const passport = require('passport');

module.exports = {
  getLogIn: async (req, res) => {
    res.render('log-in');
  },
};
