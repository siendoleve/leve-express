const catchAsync = require('../utils/catchAsync');
const SpentPerLot = require('../models/spentPerLot.model');
const AppError = require('../utils/appError');

exports.existSpentPerLot = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const spentPerLot = await SpentPerLot.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!spentPerLot)
    return next(new AppError(`SpentPerLot with id: ${id} not found`));

  req.spentPerLot = spentPerLot;
  next();
});
