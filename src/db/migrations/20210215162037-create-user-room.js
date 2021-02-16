module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserRooms', {
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
    await queryInterface.dropTable('UserRooms');
  },
};
