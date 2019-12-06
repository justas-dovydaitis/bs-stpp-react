import React from 'react';
import Drawer from './Components/Drawer';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const App = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className="container mt-0">
        <div className="d-flex">
          <Drawer />
          <main className={classes.content}>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;