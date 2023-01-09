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
            // Step-1 Ngambil value req.body
            let {username, email, password, role} = req.body

            // Step-2
            await users.create({
                username, email, password: await hashPassword(password), role
            })

            // Step-3
            res.status(201).send({
                isError: false, 
                message: 'Register Success',
                data: null
            })
        } catch (error) {
            res.status(404).send({
                isError: false, 
                message: error.errors[0].message,
                data: null
            })
        }
    },

    login: async(req, res) => {
        try {
            // Step-1 Ambil value dari req.query
            let {usernameOrEmail, password} = req.query

            // Step-2 Check username/email and password exist or not
            let findUsers = await users.findOne({
                where: {
                    [Op.or]: [
                        {
                            username: usernameOrEmail 
                        },
                        {
                            email: usernameOrEmail
                        }
                    ]
                }
            })

            if(!findUsers) return res.status(404).send({
                isError: true, 
                message: 'Username or Email Not Found', 
                data: null
            })

            let hasMatchResult = await hashMatch(password, findUsers.password)

            if(hasMatchResult === false) return res.status(404).send({
                isError: true, 
                message: 'Password Not Match',
                data: null
            })

            // Step-3 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Login Success',
                data: {
                    token: createToken({id: findUsers.id})
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}