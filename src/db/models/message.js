import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate() {
    }
  }
  Message.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FROM: {
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
