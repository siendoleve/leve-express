const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const SpentPerLot = db.define('spent_per_lot', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = SpentPerLot;
