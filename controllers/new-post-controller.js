const db = require('../db/queries');

module.exports = {
  getNewPost: async (req, res) => {
    res.render('new-post', { user: req.user });
  },
  postNewPost: async (req, res) => {
    try {
      const { title, message } = req.body;
      if (!req.user) {
        res.send('Log in first');
      }
      const userid = req.user.id;
      await db.addNewMessage(title.trim(), message.trim(), userid);
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  },
};
