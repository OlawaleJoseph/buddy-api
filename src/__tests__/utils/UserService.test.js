import UserService from '../../utils/userService';
import { sequelize } from '../../db/models';
import { regBody } from '../../__mock__/user';

describe('UserService', () => {
  beforeAll(async (done) => {
    await sequelize.sync({ force: true });
    done();
  });

  afterAll(async (done) => {
    // await sequelize.sync({ force: true });
    await sequelize.close();
    done();
  });

  describe('Register', () => {
    it('should register a user', async () => {
      const user = await UserService.register(regBody);

      expect(user).toBeTruthy();
      expect(Object.keys(user)).toContain('id', 'username', 'email');
    });

    it('should throw an error for invalid input', async () => {
      await expect(() => UserService.register({})).rejects.toThrow();
    });
  });

  describe('Password Hash', () => {
    it('should has a password', () => {
      const password = 'password';
      const hashedPassword = UserService.hashPassword(password);

      expect(hashedPassword).toBeTruthy();
      expect(hashedPassword).not.toEqual(password);
    });

    it('should return true for matching passwords', () => {
      const password = 'password';
      const hashedPassword = UserService.hashPassword(password);
      const verifiedPassword = UserService.verifyPassword(password, hashedPassword);
      expect(verifiedPassword).toBe(true);
      expect(verifiedPassword).not.toBe(false);
    });
  });

  describe('Find By Id', () => {
    it('should return found user', async () => {
      const { id } = await UserService.register(regBody);
      const foundUser = await UserService.findById(id);

      expect(foundUser).toBeTruthy();
      expect(id).toEqual(foundUser.id);
      expect(Object.keys(foundUser)).toContain('id', 'username', 'email');
    });

    it('should return false for not found user', async () => {
      const foundUser = await UserService.findById(1000);

      expect(foundUser).toBe(false);
    });
  });
});
