const db = require('../config/db');

class Tender {
  static async getAllActive() {
    const [rows] = await db.execute(
      'SELECT * FROM tenders WHERE end_time > NOW() ORDER BY start_time ASC'
    );
    return rows;
  }

  static async getEnded() {
    const [rows] = await db.execute(
      'SELECT * FROM tenders WHERE end_time <= NOW() ORDER BY end_time DESC'
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM tenders WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async getByUserId(userId) {
    const [rows] = await db.execute(
      'SELECT * FROM tenders WHERE institution_id = ? ORDER BY start_time DESC',
      [userId]
    );
    return rows;
  }

  static async create(data) {
    const { title, description, institution_id, start_time, end_time, max_budget } = data;
    await db.execute(
      'INSERT INTO tenders (title, description, institution_id, start_time, end_time, max_budget) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, institution_id, start_time, end_time, max_budget]
    );
  }
}

module.exports = Tender;