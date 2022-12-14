const fs = require('fs')

module.exports = {
    getMoviesBy: (req, res) => {
        // Step-1 Ambil value dari request
        let dataQuery = req.query 

        // Step-1.1 Kita replace % dengan spasi
        dataQuery.status?.includes('%')? dataQuery.status = dataQuery.status.replace(/%/g, ' ') : dataQuery.status = dataQuery.status 
        dataQuery.time?.includes('%')? dataQuery.time = dataQuery.time.replace(/%/g, ' ') : dataQuery.time = dataQuery.time
        // console.log(typeof dataQuery.status.includes('%'))
     
        // Step-2 Ambil db.json
        let {movies} = JSON.parse(fs.readFileSync('./db/db.json'))
        console.log(dataQuery)
        // Step-3 Manipulasi data
        let dataToSend = []
        movies.forEach((value) => {
            if(dataQuery.status === value.status && dataQuery.location === value.location && dataQuery.time === value.time){
                dataToSend.push(value)
            }
            else if(dataQuery.status === value.status){
                dataToSend.push(value)
            }else if(dataQuery.location === value.location){
                dataToSend.push(value)
            }else if(dataQuery.time === value.time){
                dataToSend.push(value)
            }
        })
        
        // Step-4 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Search Data Success',
            data: dataToSend
        })
    }
}