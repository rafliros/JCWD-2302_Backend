// Import Multer
const {multerUpload} = require('./../lib/multer')

// Import DeleteFiles
const deleteFiles = require('./../helpers/deleteFiles')

const uploadImages = (req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'images', maxCount: 3}])
    multerResult(req, res, function (err){
        try { 
            if(err) throw err
            console.log(req.files.images)
            req.files.images.forEach((value) => {
                if(value.size > 100000) throw { message: `${value.originalname} size too large`, fileToDelete: req.files }
            })
            console.log('Nexttt')
            next()
        } catch (error) {
            
            if(error.fileToDelete){
                deleteFiles(error.fileToDelete)
            }

            return res.status(404).send({
                isError: true, 
                message: error.message, 
                data: null
            })
        }
    })
}

module.exports = uploadImages