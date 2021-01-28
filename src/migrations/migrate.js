import db from '../db/connection';

const createUserTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS users 
  ( 
    id         INT PRIMARY KEY auto_increment, 
    username   VARCHAR(25) UNIQUE NOT NULL, 
    password   CHAR(60) NOT NULL, 
    email      VARCHAR(100) UNIQUE NOT NULL
    );`;
  try {
    await db.query(sql);
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line import/prefer-default-export
export const createTables = () => {
  createUserTable();
};

require('make-runnable');
