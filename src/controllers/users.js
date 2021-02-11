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
      // console.log(error);
      next(error);
    }
    return null;
  }

  /**
   *@description login method for users
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next pass functionality to next middleware
   * @returns {object} res
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const existingUser = await UserService.findByEmail(email);
      if (!existingUser) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect username or password.',
        });
      }
      const validPassword = await UserService.verifyPassword(password, existingUser.password);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          error: 'Incorrect username or password.',
        });
      }
      const token = generateToken({ email });
      return res.status(200).set('Authorization', `Bearer ${token}`).json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
    return null;
  }
}

export default UserController;
