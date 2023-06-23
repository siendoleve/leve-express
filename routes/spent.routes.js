const express = require('express');

//controllers
const spentController = require('../controllers/spent.controller');

//middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const spentMiddleware = require('../middlewares/spent.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(spentController.findAll)
  .post(validationsMiddleware.createSpentValidation, spentController.create);

router.get('/type/:id', spentController.findSpentByType);

router
  .use('/:id', spentMiddleware.existSpent)
  .route('/:id')
  .get(spentController.findOne)
  .patch(spentController.update)
  .delete(spentController.delete);

module.exports = router;
