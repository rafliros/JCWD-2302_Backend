module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    hotel_name: DataTypes.STRING,
    hotel_location: DataTypes.STRING,
    room_name: DataTypes.STRING,
    total_room: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    checkin: DataTypes.DATEONLY,
    checkout: DataTypes.DATEONLY,
    expired_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});

  transactions.associate = function(models){
    // Assocations define here
    transactions.belongsTo(models.users, {
      foreignKey: 'users_id'
    })

    transactions.belongsTo(models.hotels_rooms, {
      foreignKey: 'hotels_rooms_id'
    })
  }

  return transactions
}