const Joi = require('@hapi/joi')

const addingAdminInputValidation = (data) => {
    const schema = {
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    type_user: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const registerInputValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
  };
  return Joi.validate(data, schema)
}


module.exports.addingAdminInputValidation = addingAdminInputValidation
module.exports.registerInputValidation = registerInputValidation


