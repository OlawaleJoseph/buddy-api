const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomModerator extends Model {
    static associate(models) {
      RoomModerator.belongsTo(models.User, { foreignKey: 'UserId' });
      RoomModerator.belongsTo(models.Room, { foreignKey: 'RoomId' });
    }
  }
  RoomModerator.init({}, {
    sequelize,
    modelName: 'RoomModerator',
    // tableName: 'RoomModerators',
  });
  return RoomModerator;
};
