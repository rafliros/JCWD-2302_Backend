// Import Sequelize
const { sequelize } = require('./../models')

// Import models
const db = require('./../models/index')
const users = db.users
const { Op } = require('sequelize')

// To generate UID
const { v4: uuidv4 } = require('uuid');

// Import jwt
const {createToken} = require('./../lib/jwt')

// Import hashing
const {hashPassword, hashMatch} = require('./../lib/hash')

module.exports = {
    register: async(req, res) => {
        const t = await sequelize.transaction() 
        try {
            
        } catch (error) {
           
        }
    }
}