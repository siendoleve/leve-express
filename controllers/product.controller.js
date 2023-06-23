const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    products,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, code, description, price } = req.body;

  const product = await Product.create({
    title: title.trim().toLowerCase(),
    code,
    description,
    price,
  });

  return res.status(201).json({
    message: 'The product has been created',
    product,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { product } = req;

  return res.status(200).json({
    status: 'success',
    product,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { title, code, description, price } = req.body;

  await product.update({
    title: title.trim().toLowerCase(),
    code,
    description,
    price,
  });

  return res.status(200).json({
    status: 'success',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: false });

  return res.status(200).json({
    status: 'success',
  });
});
