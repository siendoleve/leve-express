const LotType = require('../models/lotType.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const typesLots = await LotType.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    typesLots,
  });
});
