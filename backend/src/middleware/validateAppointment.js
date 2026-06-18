const { body, validationResult } = require('express-validator');

const appointmentValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('service').isIn(['cosmetic','implants','orthodontic','preventive','restorative','emergency']).withMessage('Invalid service'),
  body('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be YYYY-MM-DD'),
  body('time').isIn(['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM']).withMessage('Invalid time slot'),
  body('isNewPatient').isIn(['yes','no']).withMessage('isNewPatient must be yes or no')
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation errors', data: errors.array() });
  }
  next();
}

module.exports = { appointmentValidationRules, validate };
