const express = require('express')
const app = express()
app.use(express.json()) // Initialize body parser ---> Untuk menerima request.body dari frontend

const PORT = 5000

// ### Sequelize Synchronous
const Sequelize = require('sequelize');
const Models = require('./models');
Models.sequelize.sync({
    force : false,
    alter: true,
    logging : console.log
}).then(function () {
    console.log('Database is Synchronized!')

}).catch(function (err) {
    console.log(err, "Something Went Wrong with Database Update!")
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Our API</h1>')
})

const { usersRouter, hotelsRouter } = require("./routers");
app.use('/users', usersRouter)
app.use('/hotels', hotelsRouter)

app.listen(PORT, () => console.log('API Running on Port ' + PORT))