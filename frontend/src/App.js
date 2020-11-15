import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import {GoogleAuth} from 'google-auth-library';

const auth = new GoogleAuth();

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [item, setItem] = React.useState('');
  const [list, setList] = React.useState([]);
  const [client, setClient] = React.useState(null);

  const getAuthHeader = async (serviceUrl) => {
    try {
      // Create a Google Auth client with the Renderer service url as the target audience.
      if (!client) {
        const cli = await auth.getIdTokenClient(serviceUrl);
        console.log('got auth token yay');
        setClient(cli)
      }
      // Fetch the client request headers and add them to the service request headers.
      // The client request headers include an ID token that authenticates the request.
      const clientHeaders = await client.getRequestHeaders();
      return clientHeaders['Authorization'];
    } catch (err) {
      throw Error('could not create an identity token: ', err);
    }
  }

  useEffect(() => {
    const serviceRequestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 3000,
    };

    if (!process.env.REACT_APP_BACKEND_URL) {
      throw Error('BACKEND_URL needs to be set.');
    }
    const serviceUrl = process.env.REACT_APP_BACKEND_URL;

    try {

      const fetchData = async () => {
        const clientHeaders = await getAuthHeader(serviceUrl)
        serviceRequestOptions.headers['Authorization'] = clientHeaders['Authorization'];
        const res = await fetch(`${serviceUrl}/v1/items`, serviceRequestOptions);
        console.log("res from useEffect fetch", res);
        setList(res);
      };

      fetchData();
    } catch (err) {
      throw Error('request to backend service failed: ', err);
    }
  }, []);

  const handleInput = (shoppingItem) => {
    setItem(shoppingItem)
  }

  const handleItemSubmit = async () => {
    console.log("button got clicked", item);
    const serviceRequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 3000,
      body: item,
    };

    const serviceUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const clientHeaders = await getAuthHeader(serviceUrl);
      serviceRequestOptions.headers['Authorization'] = clientHeaders['Authorization'];
      const res = await fetch(`${serviceUrl}/v1/items`, serviceRequestOptions);
      console.log("posted item to backend", res);
    } catch (err) {
      throw Error('request to backend service failed: ', err);
    }
    
  }

  return (
    <div style={{marginTop: '2rem', marginLeft: '2rem'}}>
      <h2>Awesome Shopping List app</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Item"
          variant="outlined"
          onChange={(e) => handleInput(e.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        style={{marginLeft: '0.5rem'}}
        onClick={handleItemSubmit}
      >
        Save
      </Button>
      <div style={{marginTop: '1rem', marginLeft: '2rem'}}><pre>{ JSON.stringify(list, null, 2) }</pre></div>
    </div>
  );
}

export default App;
