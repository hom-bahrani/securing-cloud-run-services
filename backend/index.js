const pkg = require('./package.json');
const PORT = process.env.PORT || 8080;
const express = require('express');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log(`backend server got called with ${JSON.stringify(data)}`);
    res.status(200).json(data);
  } catch (err) {
    console.log('error: getting reponse:', err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => console.log(`${pkg.name} listening on port ${PORT}`));
