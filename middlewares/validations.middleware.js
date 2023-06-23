const { check, body } = require('express-validator');
const { validationResult } = require('express-validator');

/* A middleware function that checks if the request body has any errors. If there are errors, it
returns a 400 status code with the errors. If there are no errors, it calls the next middleware
function. */
const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.updateUserValidation = [
  check('username', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  validateFields,
];

exports.updatePasswordUserValidation = [
  check('currentPassword', 'The current password must be mandatory')
    .not()
    .isEmpty(),
  check('newPassword', 'The new password must be mandatory').not().isEmpty(),
  validateFields,
];

exports.registerUserValidation = [
  check('name', 'The name must be mandatory').not().isEmpty(),
  check('dni', 'The dni must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
  validateFields,
];

exports.loginUserValidation = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
  validateFields,
];

exports.createClientValidation = [
  check('name', 'The name is required').notEmpty(),
  check('surname', 'The surname is required').notEmpty(),
  check('dni', 'The dni is required').notEmpty(),
  check('phone', 'The phone is required').notEmpty(),
  check('email', 'The email is required').notEmpty(),
  check('address', 'The address is required').notEmpty(),
  check('city', 'The city is required').notEmpty(),
  validateFields,
];

exports.createProductValidation = [
  check('title', 'The title is required').notEmpty(),
  check('code', 'The code is required').notEmpty(),
  check('description', 'the description is required').notEmpty(),
  check('price', 'the price is required').notEmpty(),
  validateFields,
];

exports.createLotValidation = [
  body('quantity_liters')
    .notEmpty()
    .withMessage('quantity_liters is required')
    .isNumeric()
    .withMessage('quantity_liters must be a number'),
  body('code').notEmpty().withMessage('code is required'),
  body('discount')
    .notEmpty()
    .withMessage('discount is required')
    .isNumeric()
    .withMessage('discount must be a number'),
  body('cost_liter')
    .notEmpty()
    .withMessage('cost_liter is required')
    .isNumeric()
    .withMessage('cost_liter must be a number'),
  body('reused_bottles')
    .notEmpty()
    .withMessage('reused_bottles is required')
    .isNumeric()
    .withMessage('reused_bottles must be a number'),
  body('lot_total_cost')
    .notEmpty()
    .withMessage('lot_total_cost is required')
    .isNumeric()
    .withMessage('lot_total_cost must be a number'),
  body('lot_type_id')
    .notEmpty()
    .withMessage('lot_type_id is required')
    .isNumeric()
    .withMessage('lot_type_id must be a number'),
  validateFields,
];

exports.createBuyValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('quantity is required')
    .isNumeric()
    .withMessage('quantity must be a number'),
  body('total_price')
    .notEmpty()
    .withMessage('total_price is required')
    .isNumeric()
    .withMessage('total_price must be a number'),
  body('client_id')
    .notEmpty()
    .withMessage('client_id is required')
    .isNumeric()
    .withMessage('client_id must be a number'),
  body('product_id')
    .notEmpty()
    .withMessage('product_id is required')
    .isNumeric()
    .withMessage('product_id must be a number'),
  body('lot_id')
    .notEmpty()
    .withMessage('lot_id is required')
    .isNumeric()
    .withMessage('lot_id must be a number'),
];

exports.createSpentValidation = [
  body('description').notEmpty().withMessage('description is required'),
  body('value')
    .notEmpty()
    .withMessage('value is required')
    .isNumeric()
    .withMessage('value must be a number'),
  body('spent_type_id')
    .notEmpty()
    .withMessage('spent_type_id is required')
    .isNumeric()
    .withMessage('spent_type_id must be a number'),
];

exports.createSpentPerLotValidation = [
  body('lot_id')
    .notEmpty()
    .withMessage('lot_id is required')
    .isNumeric()
    .withMessage('lot_id must be a number'),
  body('spent_id')
    .notEmpty()
    .withMessage('spent_id is required')
    .isNumeric()
    .withMessage('spent_id must be a number'),
];

exports.createIncomeValidation = [
  body('value')
    .notEmpty()
    .withMessage('value is required')
    .isNumeric()
    .withMessage('value must be a number'),
  body('company_id')
    .notEmpty()
    .withMessage('company_id is required')
    .isNumeric()
    .withMessage('company_id must be a number'),
  body('income_type_id')
    .notEmpty()
    .withMessage('income_type_id is required')
    .isNumeric()
    .withMessage('income_type_id must be a number'),
];

exports.createEconomicAssetsValidation = [
  body('name').notEmpty().withMessage('name is required'),
  body('company_id')
    .notEmpty()
    .withMessage('company_id is required')
    .isNumeric()
    .withMessage('company_id must be a number'),
  body('value')
    .notEmpty()
    .withMessage('value is required')
    .isNumeric()
    .withMessage('value must be a number'),
];
