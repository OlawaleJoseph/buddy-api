module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      to: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      from: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isRead: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      delivered: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Messages');
  },
};
