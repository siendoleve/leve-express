const catchAsync = require('../utils/catchAsync');
const Client = require('../models/client.model');
const AppError = require('../utils/appError');

exports.clientExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findOne({
    status: true,
    id,
  });

  if (!client) {
    return next(new AppError(`Client with id: ${id} not found`, 404));
  }

  req.client = client;
  next();
});
