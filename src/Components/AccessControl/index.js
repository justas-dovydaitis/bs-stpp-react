 
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    userRole: state.user.role
});

const AccessControll = (props) => {
    const accessAllowed = props.rolesAllowed.includes(props.userRole);
    return accessAllowed ? props.children : props.noAccessComponent;
};

AccessControll.propTypes = {
    rolesAllowed: PropTypes.arrayOf(PropTypes.oneOf(['Guest', 'Admin', 'Standard'])).isRequired,
    children: PropTypes.object.isRequired,
    noAccessComponent: PropTypes.object.isRequired,
};

export const ShowForPermission = connect(mapStateToProps)(AccessControll);
