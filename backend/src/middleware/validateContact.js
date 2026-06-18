const { body, validationResult } = require('express-validator');

const contactValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('subject').isIn(['appointment','consultation','inquiry','feedback']).withMessage('Invalid subject'),
  body('message').notEmpty().withMessage('Message is required')
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation errors', data: errors.array() });
  }
  next();
}

module.exports = { contactValidationRules, validate };
