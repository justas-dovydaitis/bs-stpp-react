import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Lolipop = (props) => {
    return (
        <div>
            <span className={`dot ${props.full ? 'full' : ''}`}></span>
            <span className='stick'></span>
        </div>
    );
}
const AgendaItem = (props) => {

    return (

        <div className='row agenda-item'>
            <div className='col-1 col-md-2 col-lg-1 text-right' >
                <div className='time'>
                    {new Intl.DateTimeFormat('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric'
                    }).format(new Date(props.starts))}
                </div>
            </div>
            <div className='col-1 text-center'>
                <Lolipop />
            </div>
            <div className='col text-left'>
                <Link to={`/lectures/${props._id}`} style={{ color: 'inherit' }} >
                    <h3>{props.name}</h3>
                </Link>
                <div className='pb-3'>
                    {props.shortDescription || 'no description'}
                </div>
            </div>
        </div>

    );
}
export default AgendaItem;

