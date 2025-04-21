const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.renderLoginForm = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);

  if(!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('auth/login', {
      title: 'Login',
      error: 'Nieprawidłowe dane logowania.'
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username
  }

  res.redirect('/');
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};