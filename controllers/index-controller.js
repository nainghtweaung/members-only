module.exports = {
  getIndex: (req, res) => {
    const user = req.user ? req.user : null;
    console.log(user);
    res.render('index', { user });
  },
};
