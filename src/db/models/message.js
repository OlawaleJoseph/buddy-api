import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'to',
      });
      Message.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'from',
      });
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
    from: {
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
