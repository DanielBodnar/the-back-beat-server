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
  res.json({
    'name': 'Austin',
    'age': 32,
    'isCool': true
  });
})

router.get('/', (req, res) => {
  res.json({
    'name': 'Austin',
    'age': 32,
    'isCool': true
  });
});

router.get('/backbeat', authRequired, (req, res) => {

})

module.exports = router;
