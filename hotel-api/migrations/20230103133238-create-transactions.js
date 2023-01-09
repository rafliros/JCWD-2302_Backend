'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hotel_name: {
        type: Sequelize.STRING
      },
      hotel_location: {
        type: Sequelize.STRING
      },
      room_name: {
        type: Sequelize.STRING
      },
      total_room: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.INTEGER
      },
      checkin: {
        type: Sequelize.DATEONLY
      },
      checkout: {
        type: Sequelize.DATEONLY
      },
      expired_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      hotels_rooms_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};