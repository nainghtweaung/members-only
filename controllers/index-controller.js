const db = require('../db/queries');
const moment = require('moment');

module.exports = {
  getIndex: async (req, res) => {
    const user = req.user ? req.user : null;
    const messages = await db.getUsersMessages();
    // const dates = messages.map(({ date, id }) => ({
    //   date: moment(date).fromNow(),
    //   id,
    // }));
    messages.map((message) => {
      message.displayDate = moment(message.date).fromNow();
    });
    console.log(user, messages);
    res.render('index', { user, messages: messages.reverse() });
  },
};
