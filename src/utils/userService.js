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
    delete user?.dataValues.password;
    if (user) return user?.dataValues;
    return false;
  }

  static hashPassword(password) {
    const hash = crypto.createHmac('sha256', process.env.HASH_SECRET)
      .update(password)
      .digest('hex');
    return hash;
  }
}

export default UserService;
