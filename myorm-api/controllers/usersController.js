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
const {hashPassword, hashMatch} = require('./../lib/hashPassword')

// Import jwt
const {createToken} = require('./../lib/jwt')

// Import transporter
const transporter = require('./../helpers/transporter')

const fs = require('fs').promises

const handlebars = require('handlebars');

const client = require('./../connection/rconn');

const axios = require('axios')

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
            
            // Step-4.1 Kirim email verification
            const template = await fs.readFile('./template/confirmation.html', 'utf-8')
            const templateToCompile = await handlebars.compile(template)
            const newTemplate = templateToCompile({username, url: `http://localhost:3000/activation/${resCreateUsers.dataValues.id}`})
            await transporter.sendMail({
                from: 'Starbucks',
                to: email, 
                subject: 'Account Activation', 
                html: newTemplate
            })

            // Step-5 Kirim response
            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Register Success',
                data: null
            })
        } catch (error) {
            await t.rollback()
            console.log(error)
        }
    },

    login: async(req, res) => {
        // Step-1 Ambil value dari req.body
        let {username, password} = req.body

        // Step-2 Cari username dan password di database
        let findUsernameAndPassword = await users.findOne({
            where: {
                username
            }
        })

        if(!findUsernameAndPassword) return res.status(404).send({
            isError: true,
            message: 'Username Not Found',
            data: null
        })

        let matchPassword = await hashMatch(password, findUsernameAndPassword.password)
        
        if(matchPassword === false) return res.status(404).send({
            isError: true,
            message: 'Password Not Found',
            data: null
        })

        const token = createToken({id: findUsernameAndPassword.id, username: findUsernameAndPassword.username})
        
        // Step-3 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Login Success',
            data: {token, username: findUsernameAndPassword.dataValues.username}
        })
    },

    keepLogin: (req, res) => {
        try {
            console.log(req.dataToken)

            // Get data user by id 
            res.status(201).send({
                isError: false, 
                message: 'Token Valid',
                data: req.dataToken.username
            })
        } catch (error) {
            
        }
    },

    activation: async(req, res) => {
        try {
            console.log('Masukkk')
            // Step-1 Ambil id dari req.params
            let id = req.params.id 

            // Step-2 Update status Unconfirmed -> Confirmed
            await users.update(
                {status: 'Confirmed'},
                {
                    where: {
                        id
                    }
                }
            )

            // Step-3 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Account Actived!',
                data: null 
            })
        } catch (error) {
            console.log(error)
        }
    },

    getWithRedis: async(req, res) => {
        try {
            let {breed} = req.params
            
            let dataFromRedis = await client.get('dogs');
            dataFromRedis = JSON.parse(dataFromRedis)
            
            if(dataFromRedis.message.length){
                return res.status(201).send({
                    isError: false, 
                    message: 'Get Data From API Success!',
                    data: dataFromRedis.message
                })
            }

            let {data} = await axios.get(`https://dog.ceo/api/breed/${breed}/images`)
        
            client.setex('dogs', 10000, JSON.stringify(data))

            res.status(201).send({
                isError: false, 
                message: 'Get Data From API Success!',
                data: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}   