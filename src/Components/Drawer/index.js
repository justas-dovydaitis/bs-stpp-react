import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import NavLink from './NavLink';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import PeopleIcon from '@material-ui/icons/People';
import LockIcon from '@material-ui/icons/Lock';

// import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AddBoxIcon from '@material-ui/icons/AddBox';

import AccessControl, { UserRoles } from '../AccessControl';

import toggleDrawer from '../../Actions/toggleDrawer';


import './style.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        backgroundColor: '#F97268',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(9) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
}));

const mapStateToProps = state => ({
    drawer: state.drawer,
})
const mapDispatchToProps = dispatch => ({
    toggleDrawer: (open) => dispatch(toggleDrawer(open))
})

const MyDrawer = (props) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.drawer.open,
                [classes.drawerClose]: !props.drawer.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerPaper]: true,
                    [classes.drawerOpen]: props.drawer.open,
                    [classes.drawerClose]: !props.drawer.open,
                }),
            }}
            open={props.drawer.open}
        >
            <div className={classes.toolbar}>
                <div className='w-100 text-center text-white overflow-hidden' style={{ fontSize: 20 }}>BUILD STUFF</div>
                <IconButton onClick={() => props.toggleDrawer(!props.drawer.open)}>
                    {props.drawer.open ? <ChevronLeftIcon className='text-white' style={{ fontSize: 40 }} /> : <ChevronRightIcon className='text-white' style={{ fontSize: 40 }} />}
                </IconButton>
            </div>
            <Divider className='my-2' />
            <List>
                <NavLink icon={<ViewAgendaIcon className='text-white' style={{ fontSize: 40 }} />} to='/'>Agenda</NavLink>
                <NavLink icon={<PeopleIcon className='text-white' style={{ fontSize: 40 }} />} to='/speakers'>Speakers</NavLink>
            </List>
            <AccessControl rolesAllowed={[UserRoles.admin]} noAccessComponent={''} >
                <Divider className='my-2' />
                <List>
                    <ListSubheader component="div" className='text-white'>
                        {props.drawer.open && 'ADMIN TOOLS'}&zwnj;
                </ListSubheader>
                    <NavLink icon={<PersonAddIcon className='text-white' style={{ fontSize: 40 }} />} to='/add-speaker'>Add Speaker</NavLink>
                    <NavLink icon={<AddLocationIcon className='text-white' style={{ fontSize: 40 }} />} to='/add-place'>Add Place</NavLink>
                    <NavLink icon={<AddBoxIcon className='text-white' style={{ fontSize: 40 }} />} to='/add-lecture'>Add Lecture</NavLink>
                </List>
            </AccessControl>
            <Divider className='my-2' />
            <List style={{ bottom: 0 }}>
                {/* <NavLink icon={<AccountBoxRoundedIcon className='text-white' style={{ fontSize: 40 }} />} to='/profile'>Profile</NavLink> */}
                <AccessControl rolesAllowed={[UserRoles.admin, UserRoles.standard]} noAccessComponent={''} >
                    <NavLink icon={<LockIcon className='text-white' style={{ fontSize: 40 }} />} to='/signout'>Log out</NavLink>
                </AccessControl>
                <AccessControl rolesAllowed={[UserRoles.guest]} noAccessComponent={''} >
                    <NavLink to='/signin'>Sing in</NavLink>
                    <NavLink to='/signup'>Sing up</NavLink>
                </AccessControl>
            </List>
        </Drawer>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(MyDrawer);
export { NavLink };