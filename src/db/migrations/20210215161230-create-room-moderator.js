module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RoomModerators', {
      roomId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('RoomModerators');
  },
};
