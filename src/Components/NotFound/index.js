import React from 'react';


const NotFound = (props) => {
    return (
        <div className='container-fluid'>
            <div className='vertical-center horizontal-center text-center'>
                <h1 className='page-name'>404</h1>
                <strong>{props.message}</strong>
            </div>
        </div>
    )
}
export default NotFound;