require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.HOST,
    dialect: 'mysql',
    // logging: false,
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'mysql',
    logging: false,
  },
};
