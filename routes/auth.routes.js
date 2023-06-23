const { Router } = require('express');
const {
  createUser,
  login,
  renewToken,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validIfExistUserEmail } = require('../middlewares/user.middleware');
const {
  registerUserValidation,
  loginUserValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post(
  '/signup',
  registerUserValidation,
  validIfExistUserEmail,
  createUser
);

router.post('/login', loginUserValidation, login);

router.use(protect);

router.get('/renew', renewToken);

module.exports = {
  authRouter: router,
};
