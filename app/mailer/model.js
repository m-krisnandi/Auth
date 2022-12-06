const db = require('../../config/database');
const { Sequelize } = require('sequelize');

const { DataTypes } = Sequelize;

const Mailer = db.define(
  'mailers',
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
      },
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'registered', 'verified', 'expired'),
      defaultValue: 'pending',
    },
  },
  { freezeTableName: true }
);

module.exports = Mailer;
