import { registrationSchema, schemaOptions } from './schemas';

// eslint-disable-next-line import/prefer-default-export
export const validateRegistrationInput = (req, res, next) => {
  // const {
  //   username, email, password, avatar,
  // } = req.body;
  const validations = registrationSchema.validate(req.body, schemaOptions);
  console.log(validations);
  next();
};
