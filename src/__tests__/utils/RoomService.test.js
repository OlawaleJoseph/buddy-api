import RoomService from '../../utils/RoomService';
import { sequelize } from '../../db/models';

describe('Room Service', () => {
  let title;
  beforeAll(async (done) => {
    await sequelize.sync({ force: true });
    done();
  });

  beforeEach(() => {
    title = 'Test Room';
  });

  afterAll(async (done) => {
    await sequelize.sync({ force: true });
    await sequelize.close();
    done();
  });

  describe('Create Room', () => {
    it('should thrown an error if room title is not provided', async () => {
      title = undefined;

      await expect(() => RoomService.create(title)).rejects.toThrow();
    });

    it('should create a new Room', async () => {
      const createdRoom = await RoomService.create(title);

      expect(createdRoom).toBeTruthy();
      expect(Object.keys(createdRoom)).toContain('id', 'title', 'messages', 'members', 'moderators');
    });
  });
});
