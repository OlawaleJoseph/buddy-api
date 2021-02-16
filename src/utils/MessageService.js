import { Message } from '../db/models';
// import UserService from './userService';

class MessageService {
  static async create(msgBody) {
    try {
      const newMessage = await Message.create(msgBody);
      return newMessage?.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default MessageService;
