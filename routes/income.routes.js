const express = require('express');

//controllers
const incomeController = require('../controllers/income.controller');

//middlewares
const incomeMiddleware = require('../middlewares/income.middleware');
const authMiddleare = require('./../middlewares/auth.middleware');
const validationsMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleare.protect);

router
  .route('/')
  .get(incomeController.findAll)
  .post(validationsMiddleware.createIncomeValidation, incomeController.create);

router
  .use('/:id', incomeMiddleware.existIncome)
  .route('/:id')
  .get(incomeController.findOne)
  .patch(incomeController.update)
  .delete(incomeController.delete);

module.exports = router;
