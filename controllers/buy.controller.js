const { Op } = require('sequelize');

const AppError = require('../utils/appError');

const Buy = require('../models/buy.model');
const Client = require('../models/client.model');
const Income = require('../models/income.model');
const Lot = require('../models/lot.model');
const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');
const Capital = require('../models/capital.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  const { count, rows: buys } = await Buy.findAndCountAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Client,
      },
      {
        model: Product,
      },
      {
        model: Lot,
      },
    ],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    buys: {
      count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      rows: buys,
    },
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { quantity, total_price, client_id, product_id, lot_id } = req.body;

  const buyPromise = Buy.create({
    quantity,
    total_price,
    client_id,
    product_id,
    lot_id,
  });

  const incomePromise = Income.create({
    value: total_price,
    company_id: 1,
    income_type_id: 1,
  });

  const lot = await Lot.findOne({
    where: {
      id: lot_id,
    },
  });

  if (!lot) return next(new AppError('Lot not found', 404));

  const workingCapital = await Capital.findOne({
    where: {
      id: 1,
    },
  });

  if (!workingCapital) return next(new AppError('Lot not found', 404));

  console.log(lot.cost_liter, ' * ', quantity, ' = ', quantity);

  console.log(+workingCapital.value);

  console.log(+workingCapital.value + lot.cost_liter * quantity);

  const capitalPromise = workingCapital.update({
    value: +workingCapital.value + lot.cost_liter * quantity,
  });

  await Promise.all([buyPromise, incomePromise, capitalPromise]);

  return res.status(201).json({
    status: 'success',
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { buy } = req;

  return res.status(200).json({
    status: 'success',
    buy,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { buy } = req;
  const { quantity, total_price, client_id, product_id, lot_id } = req.body;

  await buy.update({ quantity, total_price, client_id, product_id, lot_id });

  return res.status(200).json({
    status: 'sucess',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { buy } = req;

  await buy.update({ status: false });

  return res.status(200).json({
    status: 'success',
  });
});

exports.findAllByType = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const { type } = req.params;

  const offset = (page - 1) * limit;

  const { count, rows: buys } = await Buy.findAndCountAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Client,
      },
      {
        model: Product,
      },
      {
        model: Lot,
        where: {
          lot_type_id: type,
        },
      },
    ],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    buys: {
      count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      rows: buys,
    },
  });
});

exports.findAllByClient = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const { name } = req.params;

  console.log(name);

  const offset = (page - 1) * limit;

  const { count, rows: buys } = await Buy.findAndCountAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Client,
        where: {
          name: {
            [Op.iLike]: `%${req.params.name}%`,
          },
        },
      },
      {
        model: Product,
      },
      {
        model: Lot,
      },
    ],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    buys: {
      count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      rows: buys,
    },
  });
});
