module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  users.associate = function(models){
    // Assocations define here
    users.belongsToMany(models.hotels_rooms, {
      as: 'hotels_rooms',
      through: {
        model: 'transactions', 
        unique: false
      },
      foreignKey: 'users_id'
    })
  }
  return users
}