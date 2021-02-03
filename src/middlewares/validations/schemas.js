import Joi from 'joi';

export const schemaOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

export const registrationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  avatar: Joi.string().empty(''),

  email: Joi.string().email().required(),
});
