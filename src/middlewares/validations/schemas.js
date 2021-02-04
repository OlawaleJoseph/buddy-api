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
    .required()
    .messages({
      'string.base': 'Username should be a type of alphanumeric',
      'string.empty': 'Username cannot be blank',
      'string.min': 'Username should have at least three(3) characters',
      'string.max': 'Username should have at most 30 characters',
      'any.required': 'Username is required',
    }),

  password: Joi.string()
    .pattern(new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$'))
    .required()
    .messages({
      'string.base': 'Password should be a type of alphanumeric',
      'string.empty': 'Password cannot be blank',
      'string.pattern.base': 'Password should have at least an uppercase and a digit',
      'any.required': 'Password is required',
    }),

  avatar: Joi.string().empty('')
    .messages({
      'string.base': 'Invalid image format',
    }),

  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email cannot be blank',
      'string.email': 'Email is invalid',
      'any.required': 'Email is required',
      // 'string.base': 'Email should be a string',
    }),
});
