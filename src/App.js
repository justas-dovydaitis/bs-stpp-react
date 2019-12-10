import React from 'react';
import Drawer from './Components/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { updateDrawer } from './Actions/toggleDrawer';
import History from './history';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    props.updateDrawer();
  });
  const classes = useStyles();
  console.log('DRAWER', props.drawer);
  return (
    <div>
      <div className="container mt-0">
        <div className="d-flex">
          <Drawer update={props.drawer.update} />
          <main className={classes.content}>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);