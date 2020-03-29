const express = require('express');
const profileController = require('../controllers/profile.controller');

const routes = express.Router();

routes
  .route('/')
  .get(profileController.index);

module.exports = routes;
