module.exports = (sequelize, DataTypes) => {
  const hotels_rooms = sequelize.define('hotels_rooms', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    total_room: DataTypes.INTEGER
  }, {});

  hotels_rooms.associate = function(models){
    // Assocations define here
    hotels_rooms.belongsTo(models.hotels, {
      foreignKey: 'hotels_id',
    })

    hotels_rooms.hasMany(models.rooms_images, {
      foreignKey: 'hotelsrooms_id'
    })

    hotels_rooms.belongsToMany(models.users, {
      as: 'users',
        through: {
          model: 'transactions', 
          unique: false
        },
        foreignKey: 'hotels_rooms_id'
    })
  }

  return hotels_rooms
}