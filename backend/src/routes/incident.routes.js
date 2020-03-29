const express = require('express');
const incidentController = require('../controllers/incident.controller');

const routes = express.Router();

routes
  .route('/')
  .get(incidentController.index)
  .post(incidentController.store);

routes
  .route('/:id')
  .delete(incidentController.remove);

module.exports = routes;