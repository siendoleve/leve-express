const express = require('express');

//controllers
const clientController = require('../controllers/client.controller');

//middlewares
const clientMiddleware = require('../middlewares/client.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(clientController.findAll)
  .post(validationMiddleware.createClientValidation, clientController.create);

router
  .use('/:id', clientMiddleware.clientExist)
  .route('/:id')
  .get(clientController.findOne)
  .patch(clientController.update)
  .delete(clientController.delete);

router.get('/name/:name', clientController.findAllByName);

module.exports = router;
