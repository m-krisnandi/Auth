const db = require('../../config/database');
const { Sequelize } = require('sequelize');

const { DataTypes } = Sequelize;

const Currency = db.define(
  'currencies',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Currency;
