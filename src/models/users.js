import query from '../db/connection';

class User {
  static async create({ username, password, email }) {
    const sql = `INSERT INTO ${User.tableName}
      (username, password, email) VALUES (?,?,?)`;

    const result = await query(sql, [username, password, email]);
    const affectedRows = result ? result.affectedRows : 0;
    console.log(affectedRows);
    return affectedRows;
  }
}

User.tableName = 'users';
