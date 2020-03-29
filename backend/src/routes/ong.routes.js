const express = require('express');
const ongController = require('../controllers/ong.controller');

const routes = express.Router();

routes
  .route('/')
  .get(ongController.index)
  .post(ongController.store);

module.exports = routes;