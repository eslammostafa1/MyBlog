import Joi from "joi";

export const signupUserValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  confirmPassword: Joi.ref("password"),
});

export const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});
