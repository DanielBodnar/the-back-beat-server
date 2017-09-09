const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      { Client } = require('pg'),
      expressValidator = require('express-validator'),
      flash = require('express-flash-messages'),
      session = require('express-session');

require('dotenv').config();

let port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(port, () => {
  console.log(`Your server is running on PORT ${ port }.`);
})
