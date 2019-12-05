import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Image';

import './style.css';

const Speaker = (props) => {
    return (
        <div className='container-fluid my-5'>
            <Link to={`/speakers/${props._id}`} className='row'>
                <div className='col-6 col-md-4 col-lg-3'>
                    <Image
                        className='img mx-auto w-100'
                        src={props.image || 'https://acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png'}
                        alt='speaker image'
                    />
                </div>
                <div className='col'>
                    <div className='position-relative w-100 h-100'>
                        <div className='position-absolute' style={{ top: '50%', transform: 'translateY(-50%)' }}>
                            <h2 className='mb-0'>{props.name}</h2>
                            <div className='font-weight-bolder my-3'>{props.job}</div>
                        </div>
                    </div>

                </div>
            </Link >
        </div>
    )
}
export default Speaker;