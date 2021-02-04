import { generateToken } from '../utils/token';
import UserService from '../utils/userService';

class UserController {
  /**
   * create method for user controller class
   * @param {*} req request object
   * @param {*} res response object
   * @returns {object} res
   */
  static async create(req, res, next) {
    const {
      email, password, avatar, username,
    } = req.body;
    try {
      const existingUser = await UserService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User already exist',
        });
      }
      const hashedPassword = UserService.hashPassword(password);
      const userObj = {
        email,
        password: hashedPassword,
        avatar,
        lastSeen: new Date(),
        username,
      };

      const newUser = await UserService.register(userObj);
      if (newUser) {
        const token = generateToken({ email });
        return res.status(201).set('Authorization', `Bearer ${token}`).json({
          success: true,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
    return null;
  }
}

export default UserController;
