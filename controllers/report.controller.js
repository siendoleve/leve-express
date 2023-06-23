const Income = require('../models/income.model');
const IncomeType = require('../models/incomeType.model');
const Spent = require('../models/spent.model');
const SpentType = require('../models/spentType.model');
const Product = require('./../models/product.model');
const Buy = require('./../models/buy.model');
const EconomicAssets = require('./../models/economicAssets.model');
const Capital = require('./../models/capital.model');
const Lot = require('./../models/lot.model');

const catchAsync = require('../utils/catchAsync');
const { Op, Sequelize } = require('sequelize');
//hallar los vienes economicos
exports.economicAssetReport = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const economicAssets = await EconomicAssets.findAll({
    where: {
      status: true,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  return res.status(200).json({
    economicAssets,
  });
});

//hallar los ingresos agrupados por su tipo y filtradas por periodo
exports.incomeReport = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const incomes = await Income.findAll({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('value')), 'total'],
      [Sequelize.col('income_type.name'), 'income_type_name'], // Cambia la referencia a "income_type"
    ],
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ['income_type_id', 'income_type.name'], // Cambia la referencia a "income_type"
    include: [
      {
        model: IncomeType,
        attributes: [],
      },
    ],
  });

  return res.status(200).json({
    incomes,
  });
});

//halar los gastos agrupados por su tipo y filtradas por periodo
exports.spentsReport = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const spents = await Spent.findAll({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('value')), 'total'],
      [Sequelize.col('spent_type.name'), 'spent_type_name'],
    ],
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ['spent_type_id', 'spent_type.name'],
    include: [
      {
        model: SpentType,
        attributes: [],
      },
    ],
  });

  return res.status(200).json({
    spents,
  });
});

//hallar las ventas por periodo
exports.buysReport = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const purchases = await Buy.findAll({
    attributes: [
      'product_id',
      [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
      [Sequelize.fn('SUM', Sequelize.col('total_price')), 'total_price'],
      [Sequelize.col('product.title'), 'product_title'],
    ],
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ['product_id', 'product.title'],
    include: [
      {
        model: Product,
        attributes: [],
      },
    ],
  });

  return res.status(200).json({
    purchases,
  });
});

//hallar la ganancia por periodo
exports.profitReport = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const baseMoney = await Capital.findOne({
    where: {
      id: 1,
    },
  });

  const assets = await EconomicAssets.sum('value', {
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
      name: 'materia prima',
    },
  });

  const workingCapital = baseMoney.value + assets;

  const totalBuy = await Buy.sum('total_price', {
    where: {
      status: true,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const incomeSum = await Income.sum('value', {
    where: {
      status: true,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const totalSpent = await Spent.sum('value', {
    where: {
      status: true,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  const utility = incomeSum - baseMoney.value - totalSpent;

  res.status(200).json({
    baseMoney: baseMoney.value,
    assets,
    workingCapital,
    totalBuy,
    totalSpent,
    utility,
  });
});

//hallar la produccion por periodo
exports.productionReport = catchAsync(async (req, res, next) => {});

exports.reportReusedBottle = catchAsync(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  const reusedBottle = await Lot.sum('reused_bottles', {
    where: {
      status: true,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  console.log('dsds', reusedBottle);

  return res.status(200).json({
    status: 'success',
    reusedBottle,
  });
});
