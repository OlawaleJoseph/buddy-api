import { Room, User } from '../db/models';

class RoomService {
  /**
   * @description An util method to create a new user
   * @param {object} roomObj The user input for creating new room
   * @returns {object} return new room object
   */
  static async create(roomObj) {
    const body = {
      ...roomObj,
      members: [],
    };

    try {
      RoomService.validateRoom(roomObj);
      const newRoom = await Room.create(body, {
        include: [{
          model: User,
          as: 'members',
        }],
      });
      return newRoom?.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description Static method to find a room by its id
   * @param {integer} id The id of room to find
   * @returns {*} found room object or false
   */
  static async findRoom(id) {
    const foundRoom = await Room.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: 'members',
        },
      ],
    });
    if (!foundRoom) return false;
    return foundRoom;
  }

  /**
   * @description A static method to add user to a room
   * @param {integer} roomId Room id of the room to add user to
   * @param {integer} userId Id of user to add to the room
   * @returns room object
   */
  static async addMember(roomId, userId) {
    try {
      if (!userId) throw new Error('User is required');
      let foundRoom = await RoomService.findRoom(roomId);
      if (!foundRoom) throw new Error('Room not found');
      await foundRoom.addMember(userId);
      foundRoom = await RoomService.findRoom(roomId);
      return foundRoom;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *@description A validation method for room creation.
   * @param {object} obj object to validate
   */
  static validateRoom(obj) {
    if (!Object.keys(obj).length || !obj.title) throw new Error('Room title is required');
  }
}

export default RoomService;
