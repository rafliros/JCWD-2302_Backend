const express = require('express')
const Router = express.Router()

// Import All Controller
const {usersController} = require('../controllers') // Akan otomatis mengambil file index.js nya

// Import DecodeToken
const jwtVerify  = require('./../middleware/decodeToken')

Router.post('/register', usersController.register)

module.exports = Router