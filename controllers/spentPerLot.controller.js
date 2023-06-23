const Spent = require('../models/spent.model');
const SpentPerLot = require('../models/spentPerLot.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const spentsPerLot = await SpentPerLot.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    spentsPerLot,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { lot_id, spent_id } = req.body;

  const { value } = await Spent.findOne({
    where: {
      status: true,
      id: spent_id,
    },
  });

  const spentPerLot = await SpentPerLot.create({ value, lot_id, spent_id });

  return res.status(201).json({
    status: 'success',
    spentPerLot,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { spentPerLot } = req;

  return res.status(200).json({
    status: 'success',
    spentPerLot,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { value } = req.body;
  const { spentPerLot } = req;

  await spentPerLot.update({ value });

  return res.status(200).json({ status: 'success' });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { spentPerLot } = req;

  await spentPerLot.update({ status: false });

  return res.status(200).json({ status: 'success' });
});
