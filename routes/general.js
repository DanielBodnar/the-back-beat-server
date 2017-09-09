const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('sup');
});

module.exports = router;
