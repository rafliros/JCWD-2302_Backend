module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING
  }, {});

  products.associate = function(models){
    // Assocations define here
    products.hasOne(models.products_detail, {
      foreignKey: 'products_id'
    })

    products.hasOne(models.products_image, {
      foreignKey: 'products_id'
    })

    products.belongsTo(models.category, {
      foreignKey: 'category_id'
    })

    products.belongsToMany(models.users, {
      through: 'carts'
    })
  }

  return products
}
    