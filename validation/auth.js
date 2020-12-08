const Joi = require('joi');

const loginValidation = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(255)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })
  return schema.validate(req);
}
exports.loginValidation = loginValidation;