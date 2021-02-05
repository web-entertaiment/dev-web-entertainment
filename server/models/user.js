'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite, {foreignKey: 'UserId'})
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Fullname tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email Sudah Terpakai'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password Tidak Boleh Kosong'
        },
        isEmail: {
          args: true,
          msg: 'Email is Invalid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password Tidak Boleh Kosong'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate:(user, options) => {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};