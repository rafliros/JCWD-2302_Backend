// Import Sequelize
const { sequelize } = require('../models')

// Import models
const db = require('../models/index')
const products = db.products
const products_images = db.products_images

// Import deleteFiles
const deleteFiles = require('./../helpers/deleteFiles')

module.exports = {
    create: async(req, res) => {
        const t = await sequelize.transaction() 
        try {
            console.log(req.files)
            // Step-1 Ngambil data dari client
            let dataToCreate = JSON.parse(req.body.data)
            // Step-2 Insert data to Products
            let postProducts = await products.create(dataToCreate, {transaction: t})
            let products_id = postProducts.dataValues.id 

            // Step-3 Insert data to Products_Images
            let pathToCreate = []
            req.files.images.forEach(value => {
                pathToCreate.push({path: value.path, products_id: products_id})
            })
            
            let createProductsImages = await products_images.bulkCreates(pathToCreate, {transaction: t, ignoreDuplicates: true})

            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Post Product Success!',
                data: null
            })
        } catch (error) {
            await t.rollback()
            deleteFiles(req.files)
            res.status(404).send({
                isError: false, 
                message: error.message,
                data: null
            })
        }
    }
}