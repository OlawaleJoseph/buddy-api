import mysql2 from 'mysql2';
import { config } from 'dotenv';

config();

class DB {
  constructor() {
    this.db = null;
    if (process.env.NODE_ENV === 'production') {
      this.db = mysql2.createPool(process.env.DATABASE_URL);
    } else if (process.env.NODE_ENV === 'development') {
      this.db = mysql2.createPool({
        host: process.env.DEV_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DEV,
      });
    } else {
      this.db = mysql2.createPool({
        host: process.env.DEV_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST,
      });
    }
  }

  async query(sql, values) {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      };
      this.db.execute(sql, values, callback);
    }).catch((err) => {
      throw new Error(err);
    });
  }
}

export default new DB().query;
