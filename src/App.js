import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateDrawer } from './Actions/toggleDrawer';

import Drawer from './Components/Drawer';
import ErrorModal from './Components/Authorization/Modal';
import History from './history';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    }
  },
}));


const mapStateToProps = state => ({
  drawer: state.drawer,
})
const mapDispatchToProps = dispatch => ({
  updateDrawer: () => dispatch(updateDrawer())
})
const App = (props) => {
  // eslint-disable-next-line
  const unlisten = History.listen((location, action) => {
    console.log(location, action)
    props.updateDrawer();
  });
  const classes = useStyles();
  return (
    <div className='container'>
      <ErrorModal />
      <div className="d-flex">
        <Drawer update={props.drawer.update} />
        <main className={classes.content}>
          <ErrorModal />
          {props.children}
        </main>
      </div>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);