const express = require('express'),
      bcrypt = require('bcryptjs'),
      { Client } = require('pg'),
      passport = require('passport'),
      router = express.Router();

const User = require('../models/user');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/backbeat',
  failureRedirect: '/',
  failureFlash: true
}));

router.post('/signup', (req, res, next) => {

  const firstName = req.body.first_name,
        lastName = req.body.last_name,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        city = req.body.city;

  const passwordHash = bcrypt.hashSync(password, 10);
  const client = new Client();

  client.connect().then(() => {
    const sql = `
      INSERT INTO backbeatuser
        (first_name, last_name, email, username, password_hash, city)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;

    const params = [firstName, lastName, email, username, passwordHash, city];

    params = params.map((param) => {
      if (param === '') {
        param = null;
      };
      return param;
    });

    return client.query(sql, params);
  }).then((results) => {
    const user = results.rows[0];
  }).then(() => {
    next();
  }).catch((err) => {
    res.redirect('/');
  }).then(() => {
    client.end();
  });

}, passport.authenticate('local', {
  successRedirect: '/backbeat'
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
