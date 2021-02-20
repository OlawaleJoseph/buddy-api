import RoomService from '../../utils/RoomService';
import { sequelize, User } from '../../db/models';
import UserService from '../../utils/userService';
import { regBody, roomBody } from '../../__mock__/user';

describe('Room Service', () => {
  let body; let createdUser;
  beforeAll(async (done) => {
    await sequelize.sync({ force: true });
    createdUser = await UserService.register(regBody);
    done();
  });

  beforeEach(() => {
    body = { ...roomBody };
  });

  afterAll(async (done) => {
    await sequelize.close();
    done();
  });

  describe('Create Room', () => {
    it('should throw an error if room title is not provided', async () => {
      body.title = undefined;

      await expect(() => RoomService.create(body)).rejects.toThrow();
    });

    it('should create a new Room', async () => {
      const room = await RoomService.create(body);

      expect(room).toBeTruthy();
      expect(Object.keys(room)).toContain('id', 'title', 'messages', 'members', 'moderators');
    });
  });

  describe('Add member to a room', () => {
    let roomId;
    let userId;

    beforeAll(async () => {
      const room = await RoomService.create(body);
      createdUser = await User.create({ ...regBody, username: 'janedoe', email: 'testmail1@mail.com' });
      roomId = room.id;
    });

    beforeEach(async () => {
      userId = createdUser.id;
    });

    it('should throw an error if room id is not provided', async () => {
      await expect(() => RoomService.addMember(undefined, userId)).rejects.toThrow();
    });

    it('should throw an error if user id is not provided', async () => {
      await expect(() => RoomService.addMember(roomId, undefined)).rejects.toThrow();
    });

    it('should throw an error if room does not exist', async () => {
      await expect(() => RoomService.addMember(10000, userId)).rejects.toThrow();
    });

    it('should throw an error if user does not exist', async () => {
      await expect(() => RoomService.addMember(roomId, 1000)).rejects.toThrow();
    });

    it('should add a user as a member of the room', async () => {
      const updatedRoom = await RoomService.addMember(roomId, userId);
      expect(updatedRoom.members[0].dataValues.id).toEqual(createdUser.id);
    });

    it('should make a user an admin of the room', async () => {
      const updatedRoom = await RoomService.addAdmin(roomId, userId);
      expect(updatedRoom.members[0].dataValues.id).toEqual(createdUser.id);
    });
  });

  describe('Remove member from a room', () => {
    let roomId;
    let userId;

    beforeAll(async () => {
      const room = await RoomService.create(body);
      createdUser = await User.create({ ...regBody, username: 'johndoe', email: 'testmail1@mail.com' });
      roomId = room.id;
      await RoomService.addMember(roomId, createdUser.id);
    });

    beforeEach(async () => {
      userId = createdUser.id;
    });

    it('should throw an error if room id is not provided', async () => {
      await expect(() => RoomService.removeMember(undefined, userId)).rejects.toThrow();
    });

    it('should throw an error if user id is not provided', async () => {
      await expect(() => RoomService.removeMember(roomId, undefined)).rejects.toThrow();
    });

    it('should throw an error if room does not exist', async () => {
      await expect(() => RoomService.removeMember(10000, userId)).rejects.toThrow();
    });

    it('should remove a user as a member of the room', async () => {
      const updatedRoom = await RoomService.removeMember(roomId, userId);

      expect(updatedRoom.members.length).toBeFalsy();
    });
  });

  describe('Update room', () => {
    let roomId;
    const param = { title: 'New Room title' };

    beforeAll(async () => {
      const room = await RoomService.create(roomBody);
      roomId = room.id;
    });

    it('should throw an error if room id is not provided', async () => {
      await expect(() => RoomService.edit(undefined, param)).rejects.toThrow();
    });

    it('should throw an error if param to update is not provided', async () => {
      const roomUpdated = await RoomService.edit(roomId, {});

      expect(roomUpdated).toBe(false);
    });

    it('should throw an error if room does not exist', async () => {
      await expect(() => RoomService.edit(10000, param)).rejects.toThrow();
    });

    it('should edit given param of the room', async () => {
      const updatedRoom = await RoomService.edit(roomId, param);

      expect(updatedRoom).toBeTruthy();
      expect(updatedRoom.title).toEqual(param.title);
    });
  });

  describe('Delete room', () => {
    let roomId;
    beforeAll(async () => {
      const room = await RoomService.create(roomBody);
      roomId = room.id;
    });

    it('should throw an error if room id is not provided', async () => {
      await expect(() => RoomService.delete(undefined)).rejects.toThrow();
    });

    it('should throw an error if room does not exist', async () => {
      await expect(() => RoomService.delete(10000)).rejects.toThrow();
    });

    it('should delete the room', async () => {
      const deletedRoom = await RoomService.delete(roomId);
      await expect(deletedRoom).toBeTruthy();
    });
  });
});
