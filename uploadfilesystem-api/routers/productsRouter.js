const express = require('express')
const Router = express.Router()

// Import Controller
const {productsController} = require('../Controllers');

// Import Upload
const upload = require('./../middleware/upload')

Router.post('/create', upload, productsController.create);
Router.delete('/delete/:products_id', productsController.delete);
Router.patch('/update/:products_images_id', upload, productsController.updatePerImage);

module.exports = Router;