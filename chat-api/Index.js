// Import Libraries 
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const cors = require('cors')

// Initialize Variable
const app = express()
app.use(cors())
const httpApp = http.createServer(app)
const io = socket(httpApp, { cors: { origin: '*' } })
const PORT = 2000

// Routes 
app.get('/', (req, res) => {
    res.send('Welcome to API Chat')
})

// Socket.io -> 2 logic -> On, Emit
let usersJoin = []
io.on('connection' , (socket) => {
    console.log('User Connected')
    console.log(socket.id)

    socket.on('user-join', ({username, roomname}) => {
        usersJoin.push({
            id: socket.id, 
            username, 
            roomname
        })
        console.log(usersJoin)

        // Filter users in room
        let usersInRoom = usersJoin.filter(value => {
            return value.roomname === roomname
        })
        console.log(usersInRoom)

        socket.join(roomname)
        socket.to(roomname).emit('message-from-server', {message: `${username} has join the room`});
    })

    socket.on('users-in-room', (roomname) => {
    
        let usersInRoom = usersJoin.filter(value => {
            return value.roomname === roomname
        })

        io.in(roomname).emit('users-in-room-feedback', usersInRoom)
    })

    socket.on('disconnect', () => {
        let idxToDisconnect = null 
        usersJoin.forEach((value, index) => {
            if(value.id === socket.id){
                idxToDisconnect = index
            }
        })

        usersJoin.splice(idxToDisconnect, 1)

        let usersInRoom = usersJoin.filter(value => {
            return value.roomname === roomname
        })
        socket.emit('users-in-room', usersInRoom)
    })
})

// Create Server 
httpApp.listen(PORT, () => {
    console.log('Server Running on Port ' + PORT)
})
