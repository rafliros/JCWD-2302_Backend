const express = require('express')
const app = express()
app.use(express.json()) // Body Parser: Mengambil data yang dikirimkan oleh client melalui body

const PORT = 5003

app.get('/', (req, res) => {
    res.status(201).send('<h1>Welcome to JCWD-2302 API</h1>')
})

// Import Router
const {expenseRouter} = require('./routers')
app.use('/expense', expenseRouter)

app.listen(PORT, () =>  console.log(`API Running on Port ${PORT}`))