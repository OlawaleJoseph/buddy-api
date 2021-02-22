import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Message, {
        foreignKey: 'receiver',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
      User.hasMany(models.Message, {
        foreignKey: 'sender',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
      User.belongsToMany(models.Room, {
        through: 'RoomModerator',
        as: 'modRooms',
        onDelete: 'cascade',
      });
      User.belongsToMany(models.Room, {
        through: 'UserRoom',
        foreignKey: 'UserId',
        as: 'myRooms',
        onDelete: 'cascade',
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
