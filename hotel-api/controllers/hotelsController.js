// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('../models/index')
const users = db.users
const hotels = db.hotels
const hotels_images = db.hotels_images
const hotels_rooms = db.hotels_rooms
const rooms_images = db.rooms_images
const transactions = db.transactions

module.exports = {
    search: async(req, res) =>{
        
    }
}