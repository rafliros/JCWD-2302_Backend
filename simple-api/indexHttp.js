const http = require('http');
const fs = require('fs'); // File System: Untuk membaca document/file
const PORT = 5000

const server = http.createServer((req, res) => {
    if(req.url == '/products'){
        if(req.method === 'GET'){
            // Step-1 Ambil db.json
            let getData = fs.readFileSync('./db/db.json')
            // getData = JSON.parse(getData) Untuk ngecek datanya apakah benar-benar keambil. Sudah tidak diperlukan
            // console.log(getData)

            // Step-2 Kirim data nya dalam bentuk response
            res.writeHead(201, "Get Data Success")
            res.end(getData)
        }else if(req.method === 'POST'){
            // Step-1 Ambil data dari client
            let body = []
            req.on('data', (data) => { // Params "data" digunakan untuk mengambil data dari client/Postman
                body.push(data)
            }).on('end', () => {
                body = JSON.parse(body) // Karena body menerima "data" yang masih dalam bentuk buffer, maka body nya harus kita parse
                console.log(body)
                // Step-2 Simpan datanya kedalam db.json
                let getData = JSON.parse(fs.readFileSync('./db/db.json')) // Baca data dari db.json kemudian di parse dalam bentuk JSON
                getData.products.push(body) // Data dari body disatukan kedalam getData
                fs.writeFileSync('./db/db.json', JSON.stringify(getData)) // Data terbaru nya, di save ke dalam db.json
              
                // Step-3 Kirim response
                res.writeHead(201, 'Post Data Success')
                res.end()
            })
            
        }
    }
})

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})