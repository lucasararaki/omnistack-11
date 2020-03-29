const express = require('express');
const sessionController = require('../controllers/session.controller');

const routes = express.Router();

routes
  .route('/')
  .post(sessionController.create);

module.exports = routes;
