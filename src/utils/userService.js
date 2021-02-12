import crypto from 'crypto';
import db from '../db/models';

const { User } = db;

class UserService {
  /**
   * Creates a new user
   * @param {object} obj user input object
   * @returns {boolean} boolean
   */
  static async register(obj) {
    try {
      const user = await User.create(obj);
      delete user?.dataValues.password;
      return user?.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find user by email
   * @param {string} email User's email to be searched
   * @returns {object} Found user object
   * @returns {boolean} False if no user was found
   */
  static async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) return user?.dataValues;
    return false;
  }

  static hashPassword(password) {
    const hash = crypto.pbkdf2Sync(password, UserService.salt,
      1000, 64, 'sha512').toString('hex');
    return hash;
  }

  static verifyPassword(password, userPassword) {
    const hash = crypto.pbkdf2Sync(password,
      UserService.salt, 1000, 64, 'sha512').toString('hex');
    return hash === userPassword;
  }
}

UserService.salt = crypto.randomBytes(16).toString('hex');

export default UserService;
