const express = require('express')
const Router = express.Router()

// Import All Controller
const {usersController} = require('../controllers') // Akan otomatis mengambil file index.js nya

// Import jwtVerify
const {tokenVerify} = require('./../middleware/verifyToken')

Router.post('/register', usersController.register)
Router.post('/login', usersController.login)
Router.post('/keep-login', tokenVerify, usersController.keepLogin)
Router.patch('/activation/:id', usersController.activation)
Router.get('/redis/:breed', usersController.getWithRedis)

module.exports = Router