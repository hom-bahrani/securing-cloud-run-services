const express = require('express');
const renderRequest = require('./render.js');
var cors = require('cors')

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ 'test': 'ok'});
});

app.post('/', async (req, res) => {
  try {
    const data = req.body;
    const response = await renderRequest(data);
    res.status(200).send(response);
  } catch (err) {
    console.log('error: auth server reponse:', err);
    res.status(500).send(err);
  }
});

module.exports = {
  app
};