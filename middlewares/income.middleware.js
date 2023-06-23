const catchAsync = require('../utils/catchAsync');
const Income = require('../models/income.model');
const AppError = require('../utils/appError');

exports.existIncome = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const income = await Income.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!income) return next(new AppError(`Income with id: ${id} not found`));

  req.income = income;
  next();
});
