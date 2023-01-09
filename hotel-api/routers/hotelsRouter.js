const express = require('express')
const Router = express.Router()

// Import Controller
const {hotelsController} = require('../Controllers');

Router.get('/search', hotelsController.search);

module.exports = Router;