import { Router } from 'express';
import UserController from '../controllers/users';
import { validateRegistrationInput, validateLoginInput } from '../middlewares/validations/auth';

const router = Router();

router.post('/auth/register', validateRegistrationInput, UserController.create);

router.post('/auth/login', validateLoginInput, UserController.login);

export default router;
