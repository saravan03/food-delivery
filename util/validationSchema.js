const joi = require("joi");
const joiDate = require("@joi/date");
const joiExtended = joi.extend(joiDate);

module.exports = {
  addUserSchema: joi.object().keys({
    name: joi.alternatives().try(joi.string(), joi.number()).required(),
    email: joi.string().required(),
    password: joi.string().required(),
  }),
  loginUserSchema: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
  changePasswordSchema: joi.object().keys({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required(),
  }),
  forgotPasswordSchema: joi.object().keys({
    email: joi.string().required(),
  }),
};
