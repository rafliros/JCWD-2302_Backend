// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const karyawan = db.karyawan
const history = db.history

// Import hashing
const {hashPassword, hashMatch} = require('./../lib/hash')

// Import jwt
const {createToken} = require('./../lib/jwt')

module.exports = {

    register: async(req, res) => {
        const t = await sequelize.transaction() 
        try {
            // Step-1 Ambil data req.body
            let {username, password, jabatan, salary} = req.body

            // Step-2 Validasi datanya
            // Step-3 Simpan data ke dalam tabel
            let insertKaryawan = await karyawan.create({username, password: await hashPassword(password)}, 
            {transaction: t})
            let karyawan_id = insertKaryawan.dataValues.id
            await history.create({jabatan, salary, karyawan_id}, {transaction: t})

            // Step-4 Response
            t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Register Success', 
                data: null 
            })
        } catch (error) {
            t.rollback()
            console.log(error)
        }
    }
}   