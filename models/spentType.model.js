const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const SpentType = db.define(
  'spent_type',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'spent_type',
  }
);

module.exports = SpentType;
