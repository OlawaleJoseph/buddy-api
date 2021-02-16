const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsToMany(models.User, { through: 'RoomModerator', as: 'moderators', onDelete: 'cascade' });
      Room.belongsToMany(models.User, {
        through: 'UserRoom', as: 'members', foreignKey: 'RoomId', onDelete: 'cascade',
      });
      Room.hasMany(models.Message, { as: 'messages', onDelete: 'cascade' });
    }
  }
  Room.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
