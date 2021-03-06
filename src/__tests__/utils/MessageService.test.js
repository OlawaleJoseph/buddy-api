import MessageService from '../../utils/MessageService';
import { User, sequelize } from '../../db/models';
import { msgBody, regBody } from '../../__mock__/user';

describe('MessageService', () => {
  let body; let user1; let user2;
  beforeAll(async (done) => {
    await sequelize.sync({ force: true });
    user1 = await User.create(regBody);
    user2 = await User.create({ ...regBody, email: 'test2@mail.com', username: 'username2' });
    done();
  });

  beforeEach(() => {
    body = { ...msgBody };
  });

  afterAll(async (done) => {
    // await sequelize.sync({ force: true });
    await sequelize.close();
    done();
  });

  describe('Create Message', () => {
    it('should thrown an error if sender is not provided', async () => {
      body.sender = undefined;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if sender does not exist', async () => {
      body.sender = 1000;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if receiver is not provided', async () => {
      body.receiver = undefined;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if receiver does not exist', async () => {
      body.receiver = 1000;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if content is not provided', async () => {
      body.content = undefined;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should create a new Message', async () => {
      body.receiver = user1.id;
      body.sender = user2.id;
      const createdMessage = await MessageService.create(body);

      expect(createdMessage).toBeTruthy();
      expect(Object.keys(createdMessage)).toContain('id', 'to', 'content', 'sender', 'isRead', 'delivered');
    });
  });
});
