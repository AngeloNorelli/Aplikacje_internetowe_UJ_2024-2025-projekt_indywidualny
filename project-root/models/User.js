const db = require('../config/db');

class User {
  static async findByUsername(username) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  static async getById(id) {
    const [rows] = await AbortController.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = User;