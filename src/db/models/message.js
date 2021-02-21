import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'receiver',
      });
      Message.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'sender',
      });
      Message.belongsTo(models.Room, { onDelete: 'cascade', foreignKey: 'RoomId' });
    }
  }
  Message.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
