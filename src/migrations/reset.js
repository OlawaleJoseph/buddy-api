/* eslint-disable import/prefer-default-export */
import db from '../db/connection';

const clearDB = async () => {
  let dbName = null;
  if (process.env.NODE_ENV === 'test') {
    dbName = process.env.DB_TEST;
  } else if (process.env.NODE_ENV === 'development') {
    dbName = process.env.DB_DEV;
  }
  try {
    await db.query(`DROP DATABASE IF EXISTS ${dbName};`);
    await db.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
  } catch (err) {
    console.log(err);
  }
};

export const reset = async () => {
  await clearDB();
};

require('make-runnable');
