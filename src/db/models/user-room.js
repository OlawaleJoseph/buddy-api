const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {
    static associate(models) {
      UserRoom.belongsTo(models.User, { foreignKey: 'UserId' });
      UserRoom.belongsTo(models.Room, { foreignKey: 'RoomId' });
    }
  }
  UserRoom.init({}, {
    sequelize,
    modelName: 'UserRoom',
    // tableName: 'UserRooms',
  });
  return UserRoom;
};
