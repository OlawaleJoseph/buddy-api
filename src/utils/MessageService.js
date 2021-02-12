import { Message } from '../db/models';
// import UserService from './userService';

class MessageService {
  static async create(msgBody) {
    // const { to, from } = msgBody;
    try {
      // const receiver = await UserService.findById(to);
      // if (!receiver) throw new Error('Receiver does not exist');
      // const sender = await UserService.findById(from);
      // if (!sender) throw new Error('Sender does not exist');

      const newMessage = await Message.create(msgBody);
      return newMessage?.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default MessageService;
