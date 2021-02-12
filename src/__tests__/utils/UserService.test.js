import UserService from '../../utils/userService';
import { User } from '../../db/models';
import { regBody } from '../../__mock__/user';

describe('UserService', () => {
  beforeAll(async () => {
    await User.sync({ force: true });
  });

  afterAll(async () => {
    await User.sync({ force: true });
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
});
