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
    }
  };
  Favourite.init({
    UserId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};