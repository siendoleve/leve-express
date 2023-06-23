const EconomicAssets = require('../models/economicAssets.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const economicAssets = await EconomicAssets.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    economicAssets,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, value, company_id } = req.body;

  const economicAsset = await EconomicAssets.create({
    name,
    value,
    company_id,
  });

  return res.status(201).json({
    status: 'success',
    economicAsset,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { economicAsset } = req;

  return res.status(200).json({
    status: 'success',
    economicAsset,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { economicAsset } = req;
  const { name, value } = req.body;

  await economicAsset.update({ name, value });

  return res.status(200).json({
    status: 'success',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { economicAsset } = req;

  await economicAsset.update({ status: false });

  return res.status(200).json({
    status: 'success',
  });
});
