import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Image';

import './style.css';

const Speaker = (props) => {
    return (
        <div className='container-fluid my-5'>
            <Link to={`/speakers/${props._id}`} className='w-50'>
                <Image
                    className='img mx-auto w-100'
                    src={props.image || 'https://acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png'}
                    alt='speaker image'
                />
                <h2 className='w-100 mb-0 text-center'>{props.name}</h2>
                <div className='w-100 text-center font-weight-bolder my-3'>{props.job}</div>
            </Link >
        </div >
    )
}
export default Speaker;