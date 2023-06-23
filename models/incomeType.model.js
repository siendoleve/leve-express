const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const IncomeType = db.define(
  'income_type',
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
    tableName: 'income_type', // Agrega esta opción para especificar el nombre de la tabla
  }
);

module.exports = IncomeType;
