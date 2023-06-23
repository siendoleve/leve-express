const catchAsync = require('../utils/catchAsync');
const Buy = require('../models/buy.model');
const AppError = require('../utils/appError');

exports.existBuy = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const buy = await Buy.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!buy) return next(new AppError(`Buy with id: ${id} not found`, 404));

  req.buy = buy;
  next();
});
