module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});

  category.associate = function(models){
    // Assocations define here
    category.hasMany(models.products, {
      foreignKey: 'category_id'
    })
  }

  return category
}
    