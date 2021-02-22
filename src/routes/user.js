import { Router } from 'express';
import UserController from '../controllers/users';
import { validateRegistrationInput, validateLoginInput } from '../middlewares/validations/auth';
import { multerUploads, cloudinaryUpload } from '../middlewares/upload';

const router = Router();

router.post('/auth/register', multerUploads.single('avatar'), cloudinaryUpload, validateRegistrationInput, UserController.create);

router.post('/auth/login', validateLoginInput, UserController.login);

export default router;
