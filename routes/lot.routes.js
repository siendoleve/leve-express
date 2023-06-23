const express = require('express');

//controllers
const lotController = require('../controllers/lot.controller');

//middlewares
const lotMiddleware = require('../middlewares/lot.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(lotController.findAll)
  .post(validationMiddleware.createLotValidation, lotController.create);

router.get('/typeLot/:type', lotController.findAllByType);

router.get('/code/:code', lotController.findAllByCode);

router
  .route('/:id')
  .get(lotMiddleware.existLot, lotController.findOne)
  .patch(lotMiddleware.existLotForDeleteAndUpdate, lotController.update)
  .delete(lotMiddleware.existLotForDeleteAndUpdate, lotController.delete);

module.exports = router;
