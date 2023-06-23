const { Op } = require('sequelize');
const Client = require('../models/client.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  console.log(page);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const { count, rows: clients } = await Client.findAndCountAll({
    where: { status: true },
    limit,
    offset: startIndex,
  });

  const totalPages = Math.ceil(count / limit);
  const pagination = {
    currentPage: page,
    itemsPerPage: limit,
    totalPages,
  };

  if (endIndex < count) {
    pagination.next = {
      page: +page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: +page - 1,
      limit,
    };
  }

  res.status(200).json({
    status: 'success',
    count,
    clients,
    pagination,
  });
});

exports.findAllByName = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const { count, rows: clients } = await Client.findAndCountAll({
    where: {
      status: true,
      name: {
        [Op.iLike]: `%${req.params.name}%`,
      },
    },
    limit,
    offset: startIndex,
  });

  const totalPages = Math.ceil(count / limit);
  const pagination = {
    currentPage: page,
    itemsPerPage: limit,
    totalPages,
  };

  if (endIndex < count) {
    pagination.next = {
      page: +page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: +page - 1,
      limit,
    };
  }

  res.status(200).json({
    status: 'success',
    count,
    clients,
    pagination,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, surname, dni, phone, email, address, city } = req.body;

  const client = await Client.create({
    name: name.trim().toLowerCase(),
    surname: surname.trim().toLowerCase(),
    dni,
    phone,
    email: email.trim().toLowerCase(),
    address,
    city,
  });

  res.status(200).json({
    status: 'success',
    client,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { client } = req;

  return res.status(200).json({
    status: 'success',
    client,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { name, surname, dni, phone, email, address, city } = req.body;
  const { client } = req;

  await client.update({
    name: name.trim().toLowerCase(),
    surname: surname.trim().toLowerCase(),
    dni,
    phone,
    email: email.trim().toLowerCase(),
    address,
    city,
  });

  return res.status(200).json({
    status: 'success',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { client } = req;

  await client.update({ status: false });

  return res.status(200).json({
    status: 'success',
  });
});
