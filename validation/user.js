const Joi = require('joi');

const userValidation = (req) => {
  const schema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(255)
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })
  return schema.validate(req);
}

module.exports = userValidation;