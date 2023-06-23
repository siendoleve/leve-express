const { Router } = require('express');
const {
  updateUser,
  deleteUser,
  findUsers,
  findUser,
  updatePassword,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validIfExistUser } = require('../middlewares/user.middleware');
const {
  updateUserValidation,
  updatePasswordUserValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUser, findUser);

router.use(protect);

router.patch(
  '/:id',
  updateUserValidation,
  validIfExistUser,
  protectAccountOwner,
  updateUser
);

router.patch(
  '/password/:id',
  updatePasswordUserValidation,
  validIfExistUser,
  protectAccountOwner,
  updatePassword
);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
