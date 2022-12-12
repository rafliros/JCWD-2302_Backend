const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Mengambil data yang dikirimkan oleh client melalui body

const fs = require('fs')

const PORT = 5001

app.get('/', (req, res) => {
    res.status(201).send('<h1>Welcome to JCWD-2302 API</h1>')
})

app.get('/products', (req, res) => {
    // Step-1 Ambil db.json
    let getData = JSON.parse(fs.readFileSync('./db/db.json'))

    // Step-2 Kirim data nya dalam bentuk response
    res.status(201).send({
        isError: false, 
        message: 'Get Data Success',
        data: getData
    })
})

app.post('/products', (req, res) => {
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
})

app.patch('/products/:id', (req, res) => {
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
})

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))