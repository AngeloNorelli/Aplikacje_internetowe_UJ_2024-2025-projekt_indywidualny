const db = require('../config/db');

class Offer {
  static async getByTenderId(tenderId) {
    const [rows] = await db.execute(
      `SELECT o.*, u.name AS bidder_name FROM offers o 
      JOIN users u ON o.bidder_id = u.id
      WHERE tender_id = ? 
      ORDER BY bid_value ASC`,
      [tenderId]
    );
    return rows;
  }
  
  static async getByUserId(userId) {
    const [rows] = await db.execute(
      `SELECT o.*, t.title AS tender_title FROM offers o 
      JOIN tenders t ON o.tender_id = t.id
      WHERE o.bidder_id = ?`,
      [userId]
    );
    return rows;
  }

  static async create(data) {
    const { tender_id, bidder_name, bid_value } = data;
    await db.execute(
      'INSERT INTO offers (tender_id, bidder_name, bid_value) VALUES (?, ?, ?)',
      [tender_id, bidder_name, bid_value]
    );
  }
}

module.exports = Offer;