import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

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

  useEffect(() => {
    if (!process.env.REACT_APP_BACKEND_URL) {
      throw Error('BACKEND_URL needs to be set.');
    }
    const serviceUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const fetchData = () => {
        fetch(metadataServerTokenURL)
        .then(res => res.text())
        .then(token => {
          fetch(receivingServiceURL, {
            method: 'GET',
            'Content-Type': 'application/json',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
        }).then(res => res.json()) // expecting a json response
          .then(json => {
            console.log(json);
            setList(json);
          });
        });
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
    const receivingServiceURL = process.env.REACT_APP_BACKEND_URL;
    const metadataServerTokenURL = `http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=${receivingServiceURL}`;
  
    try {
      fetch(metadataServerTokenURL)
        .then(res => res.text())
        .then(token => {
          fetch(receivingServiceURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: {
              title: item
            },
        }).then(res => res.json()) // expecting a json response
          .then(json => console.log(json));
        });
    } catch (error) {
      throw Error('Request failed: ', err);
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
