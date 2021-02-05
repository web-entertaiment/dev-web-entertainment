'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Favourite.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};