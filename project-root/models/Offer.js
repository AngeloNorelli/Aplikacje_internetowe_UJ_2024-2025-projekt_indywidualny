const db = require('../config/db');

class Offer {
  static async getByTenderId(tenderId) {
    const [rows] = await db.execute(
      'SELECT * FROM offers WHERE tender_id = ? ORDER BY bid_value ASC',
      [tenderId]
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