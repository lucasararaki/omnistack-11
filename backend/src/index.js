const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

// const mongodbUrl = 'mongodb+srv://<username>:<password>@cluster0-rtelk.mongodb.net/test?retryWrites=true&w=majority';
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333)
  .on('connection', () => {
    console.log(`${new Date().toISOString()}: Server is running on http://localhost:3333`);
  })
  .on('close', () => {
    console.log('Server is shutting down');
  });