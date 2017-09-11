const router = require('express').Router();
const { Client } = require('pg');

const User = require('../models/user');

function authRequired(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  };
};

router.get('/backbeat', (req, res) => {
  console.log('BACKBEAT LOGIN===========================================================', req.user);
  res.json({
    'name': 'Austin',
    'age': 32,
    'isCool': true
  });
})

router.get('/something', authRequired, (req, res) => {
  res.send('logged in');
})

router.get('/', (req, res) => {
  console.log('SESSION', req.session);
  res.json({
    'name': 'Austin',
    'age': 32,
    'isCool': true
  });
});

router.get('/api/userprofile/:username', authRequired, (req, res) => {
  const client = new Client();

  client.connect().then(() => {
    const sql = `
      SELECT *
        FROM backbeatuser
        WHERE username = $1`;

    const params = [req.params.username];

    return client.query(sql, params);
  }).then((results) => {
    console.log('PROFILE RESULTS', results.rows[0]);
    res.json(results.rows[0])
  })
})

module.exports = router;
