const Joi = require("joi");

function validateContactMessage(message) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[\d-]{1,10}$/)
      .allow(""),
    message: Joi.string().min(2).max(100).required(),
  });

  return schema.validate(message);
}

module.exports = validateContactMessage;
