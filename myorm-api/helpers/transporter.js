const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'muhammaddefryan@gmail.com', // Email Sender
        pass: 'iwxzscjenxaqhpnt' // Key Generate
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter