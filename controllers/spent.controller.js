const Capital = require('../models/capital.model');
const EconomicAssets = require('../models/economicAssets.model');
const Spent = require('../models/spent.model');
const SpentType = require('../models/spentType.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const { count, rows: spents } = await Spent.findAndCountAll({
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
    spents,
    pagination,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { description, value, spent_type_id } = req.body;

  const spentType = await SpentType.findOne({
    where: {
      id: spent_type_id,
      status: true,
    },
  });

  if (!spentType) {
    return next(new AppError('Spent type not found', 404));
  }

  if (spentType.name === 'operativos_total') {
    const capital = await Capital.findOne({
      where: {
        id: 1,
        status: true,
      },
    });

    if (!capital) return next(new AppError('Capital not found', 404));

    const rawMaterial = await EconomicAssets.findOne({
      where: {
        name: 'materia prima',
      },
    });

    if (!rawMaterial) {
      return next(
        new AppError('materia prima no existe en la base de datos', 400)
      );
    }

    const newCapital = capital.value - value;
    const newValueRawMaterial = rawMaterial.value + value;

    const capitalPromise = capital.update({ value: newCapital });
    const rawMaterialPromise = rawMaterial.update({
      value: newValueRawMaterial,
    });

    await Promise.all([capitalPromise, rawMaterialPromise]);
  }

  const spent = await Spent.create({ description, value, spent_type_id });

  return res.status(201).json({
    status: 'success',
    spent,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { spent } = req;

  return res.status(200).json({
    status: 'success',
    spent,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { spent } = req;
  const { description, value, spent_type_id } = req.body;

  await spent.update({ description, value, spent_type_id });

  return res.status(200).json({
    status: 'success',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { spent } = req;

  await spent.update({ status: false });

  return res.status(200).json({
    status: 'success',
  });
});

exports.findSpentByType = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(id);
  const { count, rows: spents } = await Spent.findAndCountAll({
    where: {
      spent_type_id: 2, //TODO: Observacion id colocado manualmente
    },
    limit,
    offset: startIndex,
  });

  console.log(spents);

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

  return res.status(200).json({
    spents,
    pagination,
  });
});
