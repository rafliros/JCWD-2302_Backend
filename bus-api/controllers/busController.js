// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const bus = db.bus
const bus_rute = db.bus_rute
const transactions = db.transactions
const transaction_details = db.transaction_details

module.exports = {
    search: async(req, res) => {
        try {
            let {date, from, to} = req.query 
            console.log(date)
            console.log(from)
            console.log(to)

            let findBusBy = await sequelize.query(`SELECT b.id, b.name, br.from, br.to, t.schedule_date, br.class, br.price, br.total_seat, IFNULL(SUM(t.total_seat), 0) AS total_seat_booked, 
                br.total_seat - IFNULL(SUM(t.total_seat), 0) AS total_seat_available FROM transactions t 
                RIGHT JOIN bus_rutes br ON (br.id = t.bus_rute_id AND (t.schedule_date = ?))
                JOIN buses b ON b.id = br.bus_id
                WHERE br.from = ? AND br.to = ?
                GROUP BY b.id;`,
                {
                    replacements: [date, from, to], 
                    type: sequelize.QueryTypes.SELECT
                } 
            )

            console.log(findBusBy)

            res.status(200).send({
                isError: false, 
                message: 'Search Bus Success', 
                data: findBusBy
            })
        } catch (error) {
            
        }
    }
}   