const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
      // validate: {
      //   is: {
      //     args: '',
      //     msg: ''
      //   }
      // }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: 'Email Not Valid'}
      }
    },
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