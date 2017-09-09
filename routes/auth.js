const express = require('express'),
      bcrypt = require('bcryptjs'),
      { Client } = require('pg'),
      passport = require('passport'),
      router = express.Router();

const User = require('./models/user');
