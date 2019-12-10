import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const NavLink = (props) => {

    return (
        <Link to={props.to}>
            <ListItem button>
                <ListItemIcon>{props.icon && props.icon}</ListItemIcon>
                <ListItemText
                    style={{ fontSize: 20 }}
                    className='text-uppercase font-weight-bold'
                    disableTypography
                    primary={props.children}
                />
            </ListItem>
        </Link>
    )
}
export default NavLink;