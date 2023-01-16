module.exports = (sequelize, DataTypes) => {
  const products_detail = sequelize.define('products_detail', {
    calories: DataTypes.INTEGER
  }, {});

  products_detail.associate = function(models){
    // Assocations define here
    products_detail.belongsTo(models.products, {
      foreignKey: 'products_id', 
      as: 'products'
    })

    products_detail.belongsToMany(models.size, {
      through: 'products_size', 
      as: 'size', 
      foreignKey: 'products_detail_id'
    })

    products_detail.belongsToMany(models.toppings, {
      through: 'products_toppings', 
      as: 'toppings'
    })
  }

  return products_detail
}
    