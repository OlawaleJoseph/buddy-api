import RoomService from '../../utils/RoomService';
import { sequelize } from '../../db/models';
import UserService from '../../utils/userService';
import { regBody } from '../../__mock__/user';

describe('Room Service', () => {
  let createdRoom; let body; let createdUser;
  beforeAll(async (done) => {
    await sequelize.sync({ force: true });
    createdUser = await UserService.create(regBody);
    done();
  });

  beforeEach(() => {
    body = { title: 'Room Title', avatar: 'avatar_link' };
  });

  afterAll(async (done) => {
    // await sequelize.sync({ force: true });
    await sequelize.close();
    done();
  });

  describe('Create Room', () => {
    it('should throw an error if room title is not provided', async (done) => {
      body.title = undefined;

      await expect(() => RoomService.create(body)).rejects.toThrow();
      done();
    });

    it('should create a new Room', async (done) => {
      createdRoom = await RoomService.create(body);

      expect(createdRoom).toBeTruthy();
      expect(Object.keys(createdRoom)).toContain('id', 'title', 'messages', 'members', 'moderators');
      done();
    });
  });

  // describe('Add member to a room', () => {
  //   const roomId = createdRoom.id;
  //   let user = null;
  //   let userId;

  //   beforeEach(async () => {
  //     user = { ...createdUser };
  //     userId = user;
  //   });

  //   it('should throw an error if room id is not provided', async () => {
  //     await expect(() => RoomService.addMember(undefined, userId)).rejects.toThrow();
  //   });

  //   it('should throw an error if user id is not provided', async () => {
  //     await expect(() => RoomService.addMember(roomId, undefined)).rejects.toThrow();
  //   });

  //   it('should throw an error if room does not exist', async () => {
  //     await expect(() => RoomService.addMember(10000, userId)).rejects.toThrow();
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     await expect(() => RoomService.addMember(roomId, { id: 10000 })).rejects.toThrow();
  //   });

  //   it('should add a user as a member of the room', async () => {
  //     const updatedRoom = await RoomService.addMember(roomId, userId);

  //     expect(updatedRoom.members).toContain(user);
  //   });
  // });

  // describe('Remove member from a room', async () => {
  //
  //   const roomId = createdRoom.id;
  //   let user = null;

  //   beforeEach(async () => {
  //     user = { ...createdUser };
  //   });

  //   it('should throw an error if room id is not provided', async () => {
  //     await expect(() => RoomService.removeMember(undefined, user)).rejects.toThrow();
  //   });

  //   it('should throw an error if user id is not provided', async () => {
  //     await expect(() => RoomService.removeMember(roomId, undefined)).rejects.toThrow();
  //   });

  //   it('should throw an error if room does not exist', async () => {
  //     await expect(() => RoomService.removeMember(10000, user)).rejects.toThrow();
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     await expect(() => RoomService.removeMember(roomId, { id: 10000 })).rejects.toThrow();
  //   });

  //   it('should remove a user as a member of the room', async () => {
  //     const updatedRoom = await RoomService.removeMember(roomId, user);

  //     expect(updatedRoom.members).toContain(user);
  //   });
  // });

  // describe('Update room', async () => {
  //   const roomId = createdRoom.id;
  //   const param = { title: 'New Room title' };

  //   it('should throw an error if room id is not provided', async () => {
  //     await expect(() => RoomService.edit(undefined, param)).rejects.toThrow();
  //   });

  //   it('should throw an error if param to update is not provided', async () => {
  //     await expect(() => RoomService.edit(roomId, {})).rejects.toThrow();
  //   });

  //   it('should throw an error if room does not exist', async () => {
  //     await expect(() => RoomService.edit(10000, param)).rejects.toThrow();
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     await expect(() => RoomService.edit(roomId, { id: 10000 })).rejects.toThrow();
  //   });

  //   it('should edit given param of the room', async () => {
  //     const updatedRoom = await RoomService.edit(roomId, param);

  //     expect(updatedRoom).toBeTruthy();
  //     expect(updatedRoom.title).toContain(param.title);
  //   });
  // });

  // describe('Exit room', async () => {
  //
  //   const roomId = createdRoom.id;
  //   createdRoom.addMember(createdUser);

  //   it('should throw an error if room id is not provided', async () => {
  //     await expect(() => RoomService.exit(undefined, createdUser)).rejects.toThrow();
  //   });

  //   it('should throw an error if user is not provided', async () => {
  //     await expect(() => RoomService.exit(roomId, undefined)).rejects.toThrow();
  //   });

  //   it('should throw an error if room does not exist', async () => {
  //     await expect(() => RoomService.exit(10000, createdUser)).rejects.toThrow();
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     await expect(() => RoomService.exit(roomId, { id: 10000 })).rejects.toThrow();
  //   });

  //   it('should remove a user as a member of the room', async () => {
  //     const exitedRoom = await RoomService.exit(roomId, createdUser);

  //     await expect(exitedRoom.members).not.toContain(createdUser);
  //   });
  // });

  // describe('Delete room', async () => {
  //
  //   const createdUser2 = await UserService.create({ ...regBody, username: 'john', email: 'teest2@mail.com' });
  //   const roomId = createdRoom.id;
  //   createdRoom.addMember(createdUser2);

  //   it('should throw an error if room id is not provided', async () => {
  //     await expect(() => RoomService.delete(undefined, createdUser)).rejects.toThrow();
  //   });

  //   it('should throw an error if user is not provided', async () => {
  //     await expect(() => RoomService.delete(roomId, undefined)).rejects.toThrow();
  //   });

  //   it('should throw an error if room does not exist', async () => {
  //     await expect(() => RoomService.delete(10000, createdUser)).rejects.toThrow();
  //   });

  //   it('should throw an error if user does not exist', async () => {
  //     await expect(() => RoomService.delete(roomId, { id: 10000 })).rejects.toThrow();
  //   });

  //   it('should throw an error user is not an admin', async () => {
  //     await expect(() => RoomService.delete(roomId, createdUser)).rejects.toThrow();
  //   });

  //   it('should remove a user as a member of the room', async () => {
  //     const deletedRoom = await RoomService.delete(roomId, createdUser2);

  //     await expect(deletedRoom).toBeTruthy();
  //   });
  // });
});
