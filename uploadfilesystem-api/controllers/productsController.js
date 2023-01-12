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
            
            let createProductsImages = await products_images.bulkCreate(pathToCreate, {transaction: t, ignoreDuplicates: true})

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
    },

    delete: async(req, res) => {
        const t = await sequelize.transaction() 
        try {
            // Step-1 Ambil id products dari query params
            let products_id = parseInt(req.params.products_id)
            // Step-2 Ambil path images to delete, untuk kebutuhan delete file nya
            let findAllImagePath = await products_images.findAll({
                where: {
                    products_id 
                }, 
                transaction: t
            })

            if(!findAllImagePath) throw {message: 'Image Id Not Found'}

            // Step-3 Delete data di tabel products_images where products_id = id params
            await products_images.destroy({
                where: {
                    products_id 
                }, 
                transaction: t
            })

            // Step-4 Delete data di tabel products where id = id params
            await products.destroy({
                where: {
                    id: products_id
                },
                transaction: t
            })

            // Step-5 Delete Files
            deleteFiles({images: findAllImagePath})

            // Step-5 Response
            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Delete Products Success!',
                data: null
            })
        } catch (error) {
            await t.rollback()
            deleteFiles(req.files)
            res.status(201).send({
                isError: false, 
                message: error.message,
                data: null
            })
        }
    },

    updatePerImage: async(req, res) => {
        const t = await sequelize.transaction()
        try {
            // Step-1 Ambil id products_images dari params
            let products_images_id = parseInt(req.params.products_images_id)

            // Step-2 Ambil path image yg lama untuk kebutuhan delete image file yg lama
            let findOldPathImage = await products_images.findOne({
                where: {
                    id: products_images_id
                },
                transaction: t
            })

            if(!findOldPathImage) throw {message: 'Image Id Not Found'}

            let pathToDelete = []
            pathToDelete.push(findOldPathImage)
            // Step-3 Update image path yang lama dengan image path terbarunya
            await products_images.update(
                {
                    path: req.files.images[0].path
                }, 
                {
                    where: {
                        id: products_images_id
                    }
                },
                {transaction: t})

            // Step-4 Delete image file yang lama
            deleteFiles({images: pathToDelete})

            await t.commit()
            // Step-5 Kirim Response
            res.status(201).send({
                isError: false, 
                message: 'Update Products Success!',
                data: null
            })
        } catch (error) {
            await t.rollback()
            deleteFiles(req.files)
            res.status(201).send({
                isError: true, 
                message: error.message ,
                data: null
            })
        }
    }
}