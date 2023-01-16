module.exports = (sequelize, DataTypes) => {
  const users_address = sequelize.define('users_address', {
    receiver: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER
  }, {});

  users_address.associate = function(models){
    users_address.belongsTo(models.users, {
      foreignKey: 'users_id',
      as: 'users'
    })
  }
  return users_address
}

