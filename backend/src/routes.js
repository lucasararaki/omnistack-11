const express = require('express');
const incidentRoutes = require('./routes/incident.routes');
const loginRoutes = require('./routes/session.routes');
const ongRoutes = require('./routes/ong.routes');
const profileRoutes = require('./routes/profile.routes');

const routes = express.Router();

// ANCHOR Health Check
routes.get('/health-check', (req, res) => {
  const { greetings } = req.query;

  let responseMessage = 'Server is running';

  if (greetings) {
    responseMessage +=`\nGreetins: ${greetings}`;
  }

  res.status(200).send(responseMessage);
});

routes.use('/incidents', incidentRoutes);
routes.use('/login', loginRoutes);
routes.use('/ongs', ongRoutes);
routes.use('/profile', profileRoutes);

module.exports = routes;