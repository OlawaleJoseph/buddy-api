import MessageService from '../../utils/MessageService';
import { Message, User } from '../../db/models';
import { msgBody, regBody } from '../../__mock__/user';

describe('MessageService', () => {
  let body;
  beforeAll(async () => {
    await Message.sync({ force: true });
    await User.sync({ force: true });
    await User.create(regBody);
    await User.create({ ...regBody, email: 'test2@mail.com', username: 'username2' });
  });

  beforeEach(() => {
    body = { ...msgBody };
  });

  describe('Create Message', () => {
    it('should thrown an error if sender is not provided', async () => {
      body.from = undefined;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if sender does not exist', async () => {
      body.from = 1000;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if receiver is not provided', async () => {
      body.to = undefined;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if receiver does not exist', async () => {
      body.to = 1000;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should thrown an error if content is not provided', async () => {
      body.content = undefined;

      await expect(() => MessageService.create(body)).rejects.toThrow();
    });

    it('should create a new Message', async () => {
      const createdMessage = await MessageService.create(body);

      expect(createdMessage).toBeTruthy();
      expect(Object.keys(createdMessage)).toContain('id', 'to', 'content', 'from', 'isRead', 'delivered');
    });
  });
});
