const db = require('../../config/database');
const { Sequelize } = require('sequelize');
const Mailer = require('../mailer/model');
const Wallet = require('../wallet/model');

const { DataTypes } = Sequelize;

const User = db.define(
  'users',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'registered', 'verified'),
      defaultValue: 'pending',
    },
  },
  { freezeTableName: true }
);

User.hasMany(Wallet, {
  foreignKey: 'id_user',
});

User.hasOne(Mailer, {
  foreignKey: {
    name: 'id_user',
  },
});

module.exports = User;
