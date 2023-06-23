const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Lot = db.define('lot', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  quantity_liters: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount_reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost_liter: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  reused_bottles: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lot_total_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lot_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Lot;
