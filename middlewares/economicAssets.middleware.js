const catchAsync = require('../utils/catchAsync');
const EconomicAssets = require('../models/economicAssets.model');
const AppError = require('../utils/appError');

exports.existEconomicAsset = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const economicAsset = await EconomicAssets.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!economicAsset)
    return next(new AppError(`economicAssets with id: ${id} not found`));

  req.economicAsset = economicAsset;
  next();
});
