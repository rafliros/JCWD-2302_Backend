const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Mengambil data yang dikirimkan oleh client melalui body

const PORT = 5004

app.get('/', (req, res) => {
    res.status(201).send('<h1>Welcome to JCWD-2302 API</h1>')
})

// Import Router
const {productRouter} = require('./routers')
app.use('/product', productRouter)

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))