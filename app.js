const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      { Client } = require('pg'),
      expressValidator = require('express-validator'),
      flash = require('express-flash-messages'),
      passport = require('passport'),
      session = require('express-session');

require('dotenv').config();

let port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'brothersofgroove',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportconfig').configure(passport);
app.use(flash());

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/general'));

app.listen(port, () => {
  console.log(`Your server is running on PORT ${ port }.`);
})
