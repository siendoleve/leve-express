const Lot = require('../models/lot.model');
const Spent = require('../models/spent.model');
const SpentPerLot = require('../models/spentPerLot.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.existLot = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const lot = await Lot.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: SpentPerLot,
        where: {
          status: true,
        },
        required: false,
        include: [
          {
            model: Spent,
            required: false,
          },
        ],
      },
    ],
  });

  if (!lot) return next(new AppError(`Lot with id: ${id} not found`, 404));

  req.lot = lot;

  next();
});

exports.existLotForDeleteAndUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const lot = await Lot.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!lot) return next(new AppError(`Lot with id: ${id} not found`, 404));

  req.lot = lot;

  next();
});
