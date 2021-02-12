import { registrationSchema, schemaOptions, loginSchema } from './schemas';

export const validateRegistrationInput = (req, res, next) => {
  const { error } = registrationSchema.validate(req.body, schemaOptions);
  if (error) {
    const messages = [];
    error.details.forEach(({ message }) => messages.push(message));
    next({ status: 422, message: messages });
  }
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, schemaOptions);
  if (error) {
    const messages = [];
    error.details.forEach(({ message }) => messages.push(message));
    next({ status: 422, message: messages });
  }
  next();
};
