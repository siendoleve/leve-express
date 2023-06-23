const catchAsync = require('../utils/catchAsync');
const SpentType = require('../models/spentType.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const spentTypes = await SpentType.findAll({
    where: {
      status: true,
    },
  });

  return res.json({
    status: 'success',
    spentTypes,
  });
});
