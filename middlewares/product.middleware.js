const catchAsync = require('../utils/catchAsync');
const Product = require('../models/product.model');
const AppError = require('../utils/appError');

exports.productExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!product)
    return next(new AppError(`The product with id: ${id} not found`, 404));

  req.product = product;
  next();
});
