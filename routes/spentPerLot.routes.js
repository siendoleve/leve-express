const express = require('express');

//controllers
const spentPerLotController = require('../controllers/spentPerLot.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const spentPerLotMiddleware = require('../middlewares/spentPerLot.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(spentPerLotController.findAll)
  .post(
    validationMiddleware.createSpentPerLotValidation,
    spentPerLotController.create
  );

router
  .use('/:id', spentPerLotMiddleware.existSpentPerLot)
  .route('/:id')
  .get(spentPerLotController.findOne)
  .patch(spentPerLotController.update)
  .delete(spentPerLotController.delete);

module.exports = router;
