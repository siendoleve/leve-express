const { Op } = require('sequelize');
const Lot = require('../models/lot.model');
const catchAsync = require('../utils/catchAsync');
const LotType = require('../models/lotType.model');
const SpentPerLot = require('../models/spentPerLot.model');
const Spent = require('../models/spent.model');
const EconomicAssets = require('./../models/economicAssets.model');

exports.findAll = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query; // Se obtienen los valores de "page" y "limit" desde la query string. Si no existen, se establecen valores predeterminados (página 1 y límite 10).

  const offset = (page - 1) * limit; // Se calcula el valor de "offset" para el método findAll de Sequelize.

  const lot = await Lot.findAndCountAll({
    // Se utiliza el método findAndCountAll para obtener la cantidad total de lotes y la lista de lotes en función de la paginación.
    where: {
      status: true,
    },
    include: [
      {
        model: LotType,
      },
      {
        model: SpentPerLot,
        include: [
          {
            model: Spent,
          },
        ],
      },
    ],
    limit,
    offset,
  });

  const pages = Math.ceil(lot.count / limit); // Se calcula la cantidad de páginas según la cantidad total de elementos y el límite por página.

  return res.status(200).json({
    status: 'success',
    lot: {
      count: lot.count,
      pages,
      page: parseInt(page),
      limit: parseInt(limit),
      rows: lot.rows,
    },
  });
});

exports.findAllByType = catchAsync(async (req, res, next) => {
  const { type } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  const {
    count,
    rows: [lot],
  } = await Lot.findAndCountAll({
    where: {
      status: true,
      lot_type_id: type,
    },
    include: [
      {
        model: LotType,
      },
      {
        model: SpentPerLot,
        include: [
          {
            model: Spent,
          },
        ],
      },
    ],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  return res.status(200).json({
    status: 'success',
    lot: {
      count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      rows: [lot],
    },
  });
});

exports.findAllByCode = catchAsync(async (req, res, next) => {
  const { code } = req.params;

  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  const {
    count,
    rows: [lot],
  } = await Lot.findAndCountAll({
    where: {
      status: true,
      code: {
        [Op.like]: `%${code}%`,
      },
    },
    include: [
      {
        model: LotType,
      },
      {
        model: SpentPerLot,
        include: [
          {
            model: Spent,
          },
        ],
      },
    ],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  return res.status(200).json({
    status: 'success',
    lot: {
      count,
      totalPages,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      rows: [lot],
    },
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const {
    quantity_liters,
    code,
    discount,
    discount_reason,
    cost_liter,
    reused_bottles,
    lot_total_cost,
    lot_type_id,
    company_id = 1,
  } = req.body;

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

  const lot = await Lot.create({
    quantity_liters,
    code,
    discount,
    discount_reason,
    cost_liter,
    reused_bottles,
    lot_total_cost,
    lot_type_id,
    company_id,
  });

  const rawMaterialAmount =
    rawMaterial.value - quantity_liters * lot.cost_liter;

  await rawMaterial.update({
    value: rawMaterialAmount,
  });

  return res.status(201).json({
    status: 'success',
    lot,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { lot } = req;

  return res.status(200).json({
    status: 'success',
    lot,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { lot } = req;
  const {
    quantity_liters,
    code,
    discount,
    discount_reason,
    cost_liter,
    reused_bottles,
    lot_total_cost,
    lot_type_id,
    company_id,
  } = req.body;

  await lot.update({
    quantity_liters,
    code,
    discount,
    discount_reason,
    cost_liter,
    reused_bottles,
    lot_total_cost,
    lot_type_id,
    company_id,
  });

  res.status(200).json({
    status: 'success',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { lot } = req;

  await lot.update({ status: false });

  return res.status(200).json({
    status: 'success',
  });
});
