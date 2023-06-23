const Income = require('../models/income.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const incomes = await Income.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    incomes,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { value, company_id, income_type_id } = req.body;

  const income = await Income.create({ value, company_id, income_type_id });

  return res.status(201).json({
    status: 'success',
    income,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { income } = req;

  return res.status(200).json({
    income,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { income } = req;
  const { value } = req.body;

  await income.update({ value });

  res.status(200).json({
    status: 'success',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { income } = req;

  await income.update({ status: false });

  res.status(200).json({
    status: 'success',
  });
});
