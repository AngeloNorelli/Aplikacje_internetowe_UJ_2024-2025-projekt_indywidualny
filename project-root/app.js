const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const tenderRoutes = require('./routes/tenderRoutes');
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tajnyklucz',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use('/', tenderRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});