// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// To generate UID
const { v4: uuidv4 } = require('uuid');

// Import models
const db = require('./../models/index')
const users = db.users
const users_address = db.users_address

// Import hashing
const {hashPassword} = require('./../lib/hashPassword')

module.exports = {
    register: async(req, res) => {
        // To rollback transactions
        const t = await sequelize.transaction() 
        try {
            // Step-1 Ambil data dari req.body
            let {username, email, password} = req.body

            // Step-2 Validasi
            if(!username.length || !email.length || !password.length) return res.status(404).send({
                isError: true,
                message: 'Data Not Found',
                data: null
            })

            // Step-3 Check ke database, username & email nya exist?
            let findUsernameAndEmail = await users.findOne({
                where: {
                    [Op.and]: [
                        { username: username },
                        { email: email }
                    ]
                }
            }, {transaction: t})
            if(findUsernameAndEmail) return res.status(404).send({
                isError: true,
                message: 'Username and Email already exist',
                data: null
            })
            // Step-4 Simpan data ke dalam database
            let resCreateUsers = await users.create({id: uuidv4(), username, email, password: await hashPassword(password)}, {transaction: t})
            console.log(resCreateUsers.dataValues.id)

            await users_address.create({receiver: 'Ryan', address: 'Kab. Bogor', phone_number: 62, users_id: resCreateUsers.dataValues.id}, {transaction: t})
            // Step-5 Kirim response
            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Register Success',
                data: null
            })
        } catch (error) {
            console.log(error)
        }
    },

    login: async(req, res) => {
        // Step-1 Ambil value dari req.body
        let {username, password} = req.body

        // Step-2 Cari username dan password di database
        let findUsernameAndPassword = await users.findOne({
            where: {
                [Op.and]: [
                    { username: username },
                    { password: password }
                ]
            }
        })
        if(!findUsernameAndPassword) return res.status(404).send({
            isError: true,
            message: 'Username and Password Not Found',
            data: null
        })
        // Step-3 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Login Success',
            data: {id: findUsernameAndPassword.dataValues.id, username: findUsernameAndPassword.dataValues.username}
        })
    }
}   