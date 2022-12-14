const express = require('express')
const Router = express.Router()

// Import All Controller
const {moviesController} = require('./../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/get', moviesController.getMoviesBy)
module.exports = Router