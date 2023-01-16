module.exports = (sequelize, DataTypes) => {
  const toppings = sequelize.define('toppings', {
    name: DataTypes.STRING
  }, {});

  toppings.associate = function(models){
    // Assocations define here
    toppings.belongsToMany(models.products_detail, {
      through: 'products_toppings', 
      as: 'products_detail'
    })
  }

  return toppings
}
    