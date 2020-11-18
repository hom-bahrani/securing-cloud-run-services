const {GoogleAuth} = require('google-auth-library');
const got = require('got');
const auth = new GoogleAuth();

let client, serviceUrl;

const renderRequest = async data => {
  if (!process.env.BACKEND_UPSTREAM_RENDER_URL)
    throw Error('EDITOR_UPSTREAM_RENDER_URL needs to be set.');

  serviceUrl = process.env.BACKEND_UPSTREAM_RENDER_URL;

  const serviceRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    timeout: 3000,
  };

  try {
    if (!client) client = await auth.getIdTokenClient(serviceUrl);
    const clientHeaders = await client.getRequestHeaders();
    serviceRequestOptions.headers['Authorization'] =
      clientHeaders['Authorization'];
  } catch (err) {
    throw Error('Could not create an identity token: ', err);
  }

  try {
    const serviceResponse = await got(serviceUrl, serviceRequestOptions);
    return serviceResponse.body;
  } catch (err) {
    throw Error('Could not create an identity token: ', err);
  }
};

module.exports = renderRequest;