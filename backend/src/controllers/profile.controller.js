const crypto = require('crypto');
const db = require('../config/dbConfig');

async function index(req, res) {
  try {
    const { authorization: ong_id } = req.headers;

    const incidents = await db('incidents')
      .where('ong_id', ong_id)
      .select('*');

    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
}

module.exports = {
  index
};
