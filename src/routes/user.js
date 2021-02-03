import { Router } from 'express';
import UserController from '../controllers/users';
import { validateRegistrationInput } from '../middlewares/validations/auth';

const router = Router();

router.post('/auth/register', validateRegistrationInput, UserController.create);

export default router;
