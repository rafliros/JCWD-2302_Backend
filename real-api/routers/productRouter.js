const express = require('express')
const Router = express.Router()

// Import All Controller
const {productController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/search', productController.getProduct)
Router.post('/post', productController.postProduct)

module.exports = Router