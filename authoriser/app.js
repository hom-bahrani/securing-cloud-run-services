const express = require('express');
const {GoogleAuth} = require('google-auth-library');
const got = require('got');

const auth = new GoogleAuth();

const app = express();
app.use(express.json());

app.post('/render', async (req, res) => {

  let client, serviceUrl;

  if (!process.env.BACKEND_UPSTREAM_RENDER_URL)
    throw Error('BACKEND_UPSTREAM_RENDER_URL needs to be set.');
  serviceUrl = process.env.BACKEND_UPSTREAM_RENDER_URL;

  const data = req.body.data;

  const serviceRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: data,
    timeout: 3000,
  };

  try {
    if (!client) client = await auth.getIdTokenClient(serviceUrl);
    const clientHeaders = await client.getRequestHeaders();
    serviceRequestOptions.headers['Authorization'] =
      clientHeaders['Authorization'];
  } catch (err) {
    console.error('could not create an identity token: ', err);
    res.status(500).send(err);
  }

  try {
    // serviceResponse converts the Markdown plaintext to HTML.
    const serviceResponse = await got(serviceUrl, serviceRequestOptions);
    res.status(200).send(serviceResponse.body);
  } catch (err) {
    console.error('request to rendering service failed: ', err);
    res.status(500).send(err);
  }

});

module.exports = {
  app
};
