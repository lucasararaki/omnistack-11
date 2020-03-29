const crypto = require('crypto');
const db = require('../config/dbConfig');

async function store(req, res) {
  try {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await db('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
}

async function index(req, res) {
  try {
    const ongs = await db('ongs').select('*');

    return res.json(ongs);
  } catch (error) {
    return res.status(500).json({ error: true, data: error });
  }
}

module.exports = {
  store,
  index,
};
