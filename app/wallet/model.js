const db = require('../../config/database');
const { Sequelize } = require('sequelize');
const Currency = require('../currency/model');

const { DataTypes } = Sequelize;

const Wallet = db.define(
  'wallets',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

Wallet.hasOne(Currency, {
  foreignKey: {
    name: 'id_wallet',
  },
});

module.exports = Wallet;
