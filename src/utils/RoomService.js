import { Room } from '../db/models';
import room from '../db/models/room';

class RoomService {
  /**
   * @description An util method to create a new user
   * @param {object} roomObj The user input for creating new room
   * @returns {object} return new room object
   */
  static async create(roomObj) {
    try {
      RoomService.validateRoom(roomObj);
      const newRoom = await Room.create(roomObj);
      return newRoom?.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }

  // static async addMember(roomId, user) {

  // }

  static validateRoom(obj) {
    if (!Object.keys(obj).length) throw new Error('Room title is required');
    if (!obj.title) throw new Error('Title is required');
  }
}

export default RoomService;
