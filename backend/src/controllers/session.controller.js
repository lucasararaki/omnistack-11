const db = require('../config/dbConfig');

async function create(req, res) {
  try {
    const { id } = req.body;

    const ong = await db('ongs')
      .where('id', id)
      .select('name')
      .first();
  
    if (!ong) {
      return res.status(400).json({ error: true, message: 'No ONG found with this ID' });
    }
  
    return res.json(ong); 
  } catch (error) {
    return res.status(500).json({ error: true, data: error });
  }
}

module.exports = {
  create
};
