const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SequelizeStore = require('connect-session-sequelize');
const db = require('./config/database');

const config = require('./config/config');

const usersRouter = require('./app/users/router');
const currencyRouter = require('./app/currency/router');
const walletRouter = require('./app/wallet/router');
const mailerRouter = require('./app/mailer/router');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: config.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/currencies', currencyRouter);
app.use('/mailers', mailerRouter);
app.use('/wallets', walletRouter);

module.exports = app;
