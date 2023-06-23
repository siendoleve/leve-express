const Client = require('./client.model');
const Buy = require('./buy.model');
const Capital = require('./capital.model');
const Company = require('./company.model');
const EconomicAssets = require('./economicAssets.model');
const Income = require('./income.model');
const Lot = require('./lot.model');
const IncomeType = require('./incomeType.model');
const LotType = require('./lotType.model');
const Product = require('./product.model');
const Spent = require('./spent.model');
const SpentPerLot = require('./spentPerLot.model');
const SpentType = require('./spentType.model');

const initModel = () => {
  Client.hasMany(Buy, {
    foreignKey: {
      name: 'client_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Buy.belongsTo(Client, {
    foreignKey: {
      name: 'client_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Lot.hasOne(Buy, {
    foreignKey: {
      name: 'lot_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Buy.belongsTo(Lot, {
    foreignKey: {
      name: 'lot_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Product.hasMany(Buy, {
    foreignKey: {
      name: 'product_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Buy.belongsTo(Product, {
    foreignKey: {
      name: 'product_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Lot.hasMany(SpentPerLot, {
    foreignKey: {
      name: 'lot_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  SpentPerLot.belongsTo(Lot, {
    foreignKey: {
      name: 'lot_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  LotType.hasMany(Lot, {
    foreignKey: {
      name: 'lot_type_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Lot.belongsTo(LotType, {
    foreignKey: {
      name: 'lot_type_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Spent.hasMany(SpentPerLot, {
    foreignKey: {
      name: 'spent_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  SpentPerLot.belongsTo(Spent, {
    foreignKey: {
      name: 'spent_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  SpentType.hasMany(Spent, {
    foreignKey: {
      name: 'spent_type_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Spent.belongsTo(SpentType, {
    foreignKey: {
      name: 'spent_type_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Company.hasMany(Lot, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Lot.belongsTo(Company, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Company.hasMany(Capital, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Capital.belongsTo(Company, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Company.hasMany(EconomicAssets, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  EconomicAssets.belongsTo(Company, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Company.hasMany(Income, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Income.belongsTo(Company, {
    foreignKey: {
      name: 'company_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  IncomeType.hasMany(Income, {
    foreignKey: {
      name: 'income_type_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  Income.belongsTo(IncomeType, {
    foreignKey: {
      name: 'income_type_id',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
};

module.exports = initModel;
