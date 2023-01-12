const express = require('express')
const Router = express.Router()

// Import Controller
const {productsController} = require('../Controllers');

// Import Upload
const upload = require('./../middleware/upload')

Router.post('/create', upload, productsController.create);
Router.delete('/delete/:products_id', productsController.delete);

module.exports = Router;