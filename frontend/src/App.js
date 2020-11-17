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

  useEffect(() => {
    if (!process.env.REACT_APP_AUTHORISER_URL) {
      throw Error('BACKEND_URL needs to be set.');
    }
    const receivingServiceURL = process.env.REACT_APP_AUTHORISER_URL;

    try {
      const fetchData = () => {
        fetch(receivingServiceURL, {
            method: 'GET',
            'Content-Type': 'application/json',
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(res => res.json()) // expecting a json response
          .then(json => {
            console.log(json);
            setList(json);
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

  const handleItemSubmit = () => {
    const receivingServiceURL = process.env.REACT_APP_AUTHORISER_URL;
  
    try {
      fetch(receivingServiceURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: {
              title: item
            },
        }).then(res => res.json())
          .then(json => console.log(json));
    } catch (error) {
      throw Error('Request failed: ', error);
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
