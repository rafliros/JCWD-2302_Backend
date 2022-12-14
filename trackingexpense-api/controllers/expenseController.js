const fs = require('fs')

module.exports = {
    getExpense: (req, res) => {
        // Step-1 Ambil db.json
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        // Step-2 Kirim response beserta data nya
        res.status(201).send({
            isError: false, 
            message: 'Get Data Success',
            data: getData
        })
    },

    getExpenseDetail: (req, res) => {
        // Step-1 Ambil id dari params
        let id = parseInt(req.params.id)

        // Step-2 Ambil data dari db.json
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        // Step-3 Manipulasi data: Ambil data yang sesuai dengan id params nya
        let dataToSend = []
        getData.expenses.forEach(value => {
            if(value.id === id) return dataToSend.push({id: value.id, name: value.name})
        })

        // Step-4 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Get Detail Data Success',
            data: dataToSend
        })
    },

    totalExpenseByRange: (req, res) => {
        // Step-1 Ngambil query date range (?start=2022-11-01&end=2022-11-05)
        let {start, end} = req.query
        start = new Date(start).getTime() // Convert to ms
        end = new Date(end).getTime()
        console.log(start)
        console.log(end)

        // Step-2 Ngambil data dari db.json
        let {expenses} = JSON.parse(fs.readFileSync('./db/db.json'))

        // Step-3 Manipulasi data
        let dataToSend = []
        expenses.forEach(value => {
            if(new Date(value.date).getTime() >= start && new Date(value.date).getTime() <= end){
                dataToSend.push(value)
            }
        })

        // Step-4 Kirim Response
        res.status(201).send({
            isError: false, 
            message: 'Get Data Success',
            data: dataToSend
        })
    }
}