import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
const AgendaNavItem = (props) => {
    return (
        <h4 className='mr-5' onClick={props.onClick}>
            {props.active && <FontAwesomeIcon icon={faMapMarkerAlt} />} {props.name}
        </h4>
    )
}
export default AgendaNavItem;