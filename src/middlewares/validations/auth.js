import { registrationSchema, schemaOptions } from './schemas';

// eslint-disable-next-line import/prefer-default-export
export const validateRegistrationInput = (req, res, next) => {
  // const {
  //   username, email, password, avatar,
  // } = req.body;
  const { error } = registrationSchema.validate(req.body, schemaOptions);
  if (error) {
    const messages = [];
    error.details.forEach(({ message }) => messages.push(message));
    next({ status: 422, message: messages });
  }
  next();
};
