import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    last_seen: DataTypes.DATE,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
