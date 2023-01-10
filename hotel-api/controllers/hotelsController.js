// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('../models/index')
const users = db.users
const hotels = db.hotels
const hotels_images = db.hotels_images
const hotels_rooms = db.hotels_rooms
const rooms_images = db.rooms_images
const transactions = db.transactions

module.exports = {
    search: async(req, res) =>{
        try {
            // Step-1 Ambil input search dari user

            let {checkin, checkout, location, from, to} = req.query

            // Step-2 Search datanya berdasarkan input user
            if(checkin && checkout && location && from && to){
                var findHotelsBy = await sequelize.query(`
                    SELECT a.hotels_id, a.hotels_name, b.rooms_price, b.total_rooms_each_hotels, a.total_room_booked, b.total_rooms_each_hotels - a.total_room_booked as total_room_available
                    FROM 
                    (
                    SELECT h.id as hotels_id, h.name as hotels_name, hr.name as room_name, IFNULL(SUM(get_room_booked_by_date_range(?, ?, t.checkin, t.checkout, t.hotels_rooms_id, t.total_room)), 0) as total_room_booked
                    FROM transactions t
                    RIGHT JOIN hotels_rooms hr ON hr.id = t.hotels_rooms_id
                    JOIN hotels h ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as a
                    CROSS JOIN
                    (
                    SELECT h.id as hotels_id, h.name, SUM(total_room) as total_rooms_each_hotels, hr.price as rooms_price FROM hotels h
                    JOIN hotels_rooms hr ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as b
                    ON a.hotels_id = b.hotels_id WHERE location = ? 
                    AND (price >= ? AND price <= ?)
                    GROUP BY a.hotels_id;
                `, {
                    replacements: [checkin, checkout, location, from, to],
                    type: sequelize.QueryTypes.SELECT
                })
            }else if(checkin && checkout && location){
                var findHotelsBy = await sequelize.query(`
                    SELECT a.hotels_id, a.hotels_name, b.rooms_price, b.total_rooms_each_hotels, a.total_room_booked, b.total_rooms_each_hotels - a.total_room_booked as total_room_available
                    FROM 
                    (
                    SELECT h.id as hotels_id, h.name as hotels_name, hr.name as room_name, IFNULL(SUM(get_room_booked_by_date_range(?, ?, t.checkin, t.checkout, t.hotels_rooms_id, t.total_room)), 0) as total_room_booked
                    FROM transactions t
                    RIGHT JOIN hotels_rooms hr ON hr.id = t.hotels_rooms_id
                    JOIN hotels h ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as a
                    CROSS JOIN
                    (
                    SELECT h.id as hotels_id, h.name, SUM(total_room) as total_rooms_each_hotels, hr.price as rooms_price FROM hotels h
                    JOIN hotels_rooms hr ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as b
                    ON a.hotels_id = b.hotels_id WHERE location = ?
                    GROUP BY a.hotels_id;
                `, {
                    replacements: [checkin, checkout, location],
                    type: sequelize.QueryTypes.SELECT
                })
            }else if(checkin && checkout && from && to){
                var findHotelsBy = await sequelize.query(`
                    SELECT a.hotels_id, a.hotels_name, b.rooms_price, b.total_rooms_each_hotels, a.total_room_booked, b.total_rooms_each_hotels - a.total_room_booked as total_room_available
                    FROM 
                    (
                    SELECT h.id as hotels_id, h.name as hotels_name, hr.name as room_name, IFNULL(SUM(get_room_booked_by_date_range(?, ?, t.checkin, t.checkout, t.hotels_rooms_id, t.total_room)), 0) as total_room_booked
                    FROM transactions t
                    RIGHT JOIN hotels_rooms hr ON hr.id = t.hotels_rooms_id
                    JOIN hotels h ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as a
                    CROSS JOIN
                    (
                    SELECT h.id as hotels_id, h.name, SUM(total_room) as total_rooms_each_hotels, hr.price as rooms_price FROM hotels h
                    JOIN hotels_rooms hr ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as b
                    ON a.hotels_id = b.hotels_id WHERE price >= ? AND price <= ?
                    GROUP BY a.hotels_id;
                `, {
                    replacements: [checkin, checkout, price],
                    type: sequelize.QueryTypes.SELECT
                })
            }else{
                console.log(checkin)
                var findHotelsBy = await sequelize.query(`
                    SELECT a.hotels_id, a.hotels_name, b.rooms_price, b.total_rooms_each_hotels, a.total_room_booked, b.total_rooms_each_hotels - a.total_room_booked as total_room_available
                    FROM 
                    (
                    SELECT h.id as hotels_id, h.name as hotels_name, hr.name as room_name, IFNULL(SUM(get_room_booked_by_date_range(?, ?, t.checkin, t.checkout, t.hotels_rooms_id, t.total_room)), 0) as total_room_booked
                    FROM transactions t
                    RIGHT JOIN hotels_rooms hr ON hr.id = t.hotels_rooms_id
                    JOIN hotels h ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as a
                    CROSS JOIN
                    (
                    SELECT h.id as hotels_id, h.name, SUM(total_room) as total_rooms_each_hotels, hr.price as rooms_price FROM hotels h
                    JOIN hotels_rooms hr ON h.id = hr.hotels_id
                    GROUP BY h.id
                    ) as b
                    ON a.hotels_id = b.hotels_id
                    GROUP BY a.hotels_id;
                `, {
                    replacements: [checkin, checkout],
                    type: sequelize.QueryTypes.SELECT
                })
            }

            res.status(201).send({
                isError: false, 
                message: 'Search Hotels Success', 
                data: findHotelsBy
            })
        } catch (error) {
            console.log(error)
        }
    }
}