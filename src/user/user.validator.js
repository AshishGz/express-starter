import Joi from "joi";

export default {
  add: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    profile_picture: Joi.string().optional(),
  }).required(),

  update: Joi.object({
    name: Joi.string().required(),
    profile_picture: Joi.string().optional(),
  }).required(),

  changeRole: Joi.object({
    role: Joi.string().required(),

  }).required(),

  updatePassword:Joi.object({
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  })


};
