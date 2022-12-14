const express = require('express')
const Router = express.Router()

// Import All Controller
const {productsController} = require('./../controllers') // Akan otomatis mengambil file index.js nya

// Import Auth
const Auth = require('./../middleware/authorization')

Router.get('/get', productsController.getProducts)
Router.post('/post', Auth, productsController.postProducts)
Router.patch('/update/:id', productsController.updateProducts)
Router.delete('/delete/:id', productsController.deleteProducts)
module.exports = Router