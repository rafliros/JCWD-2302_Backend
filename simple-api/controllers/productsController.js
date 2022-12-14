const fs = require('fs')

module.exports = {
    getProducts: (req, res) => {
        // Step-1 Ambil db.json
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        // Step-2 Kirim data nya dalam bentuk response
        res.status(201).send({
            isError: false, 
            message: 'Get Data Success',
            data: getData
        })
    },

    postProducts: (req, res) => {
        // Step-1 Ambil data dari client
        let body = req.body 

        // Step-2 Kita simpan ke db.json
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))
        let generateId = getData.products.length === 0? 1 : getData.products[getData.products.length-1].id + 1
        getData.products.push({id: generateId, ...body})
        fs.writeFileSync('./db/db.json', JSON.stringify(getData))

        // // Step-3 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Post Data Success',
            data: null
        })
    },

    updateProducts: (req, res) => {
        // Step-0 Ambil id dari params
        let id = parseInt(req.params.id) 

        // Step-1 Ambil data dari body
        let body = req.body 

        // Step-2 Read data dari db.json
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        // Step-3 Manipulasi data
        getData.products.forEach((value, index) => {
            if(value.id === id){
                value.name = body.name 
                value.price = body.price
            }
        })

        // Step-4 Save db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(getData))

        // Step-5 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Update Data Success',
            data: null 
        })
    },

    deleteProducts:(req,res) =>{
        //step 0 ambil id dari params 
        let id = parseInt(req.params.id)
        let body = req.body
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        //step 3 
        let dataToDelete
        getData.products.forEach((value, index) => {
            if (value.id === id) {
                dataToDelete = index
            }
        })
        
        if(dataToDelete === undefined) return res.status(401).send({ isError: true, message: 'Id Not Found', data: null })

        getData.products.splice(dataToDelete,1)

        fs.writeFileSync('./db/db.json', JSON.stringify(getData))

        res.status(201).send({
            isError: false,
            message: "data delete success",
            data: null
            })
    }
}