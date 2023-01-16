module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING
  }, {});

  products.associate = function(models){
    // Assocations define here
    products.hasOne(models.products_detail, {
      foreignKey: 'products_id',
      as: 'products_detail'
    })

    products.hasOne(models.products_image, {
      foreignKey: 'products_id',
      as: 'products_image'
    })

    products.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'category'
    })

    products.belongsToMany(models.users, {
      as: 'users',
      through: {
        model: 'carts', 
        unique: false
      },
      foreignKey: 'products_id'
    })
  }

  return products
}
    