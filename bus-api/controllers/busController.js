// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const bus = db.bus
const bus_rute = db.bus_rute
const transactions = db.transactions
const transaction_details = db.transaction_details

module.exports = {
    search: async(req, res) => {
        
    }
}   