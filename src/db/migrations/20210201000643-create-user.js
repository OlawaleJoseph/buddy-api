module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastSeen: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    // await queryInterface.removeConstraint('Users', 'Messages_ibfk_1');
    await queryInterface.dropTable('Messages');
    await queryInterface.dropTable('Users');
  },
};
