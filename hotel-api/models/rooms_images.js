module.exports = (sequelize, DataTypes) => {
  const rooms_images = sequelize.define('rooms_images', {
    url: DataTypes.STRING
  }, {});

  rooms_images.associate = function(models){
    // Assocations define here
    rooms_images.belongsTo(models.hotels_rooms, {
      foreignKey: 'hotelsrooms_id'
    })
  }

  return rooms_images
}