const catchAsync = require('../utils/catchAsync');
const Spent = require('../models/spent.model');
const AppError = require('../utils/appError');

exports.existSpent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const spent = await Spent.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!spent) return next(new AppError(`Spent with id ${id} not found`, 404));

  req.spent = spent;
  next();
});
