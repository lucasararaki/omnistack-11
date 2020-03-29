const crypto = require('crypto');
const db = require('../config/dbConfig');

async function store(req, res) {
  try {
    const { title, description, value } = req.body;
    const { authorization: ong_id } = req.headers;

    const [id] = await db('incidents').insert({
      ong_id,
      title,
      description,
      value
    });

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: true, data: error });
  }
}

async function index(req, res) {
  try {
    const { page = 1 } = req.query;
    const [count] = await db('incidents').count();

    const incidents = await db('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.city',
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  } catch (error) {
    return res.status(500).json({ error: true, data: error });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const { authorization: ong_id } = req.headers;

    const incident = await db('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: true, message: 'Not authorized' });
    }

    await db('incidents').where('id', id).delete();

    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: true, data: error });
  }
}

module.exports = {
  store,
  index,
  remove
};
