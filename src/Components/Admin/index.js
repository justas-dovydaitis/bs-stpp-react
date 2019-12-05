import React from 'react';
import { Link } from 'react-router-dom';

const Tile = (props) => {
    return (
        <Link to={props.link} className='bg-danger col'>
            <h1 className=''>{props.text}</h1>
        </Link>
    )
}
class Admin extends React.Component {

    render() {
        return (
            <div className="container">
                <h1 className='display-1 font-weight-bold mt-5'> DASHBOARD </h1>
                <div className='container-fluid'>
                    <div className='row'>
                        <Tile link='http://fb.com' text='Create Lecture' />
                        <Tile link='http://fb.com' text='Create Speaker' />
                        <Tile link='http://fb.com' text='Create Place' />
                    </div>
                    <div className='row'>
                        <Tile link='http://fb.com' text='Manage lectures' />
                        <Tile link='http://fb.com' text='Manage speakers' />
                        <Tile link='http://fb.com' text='Manage places' />
                    </div>
                    <div className='row'>
                        <Tile link='http://fb.com' text='Create new user' />
                        <Tile link='http://fb.com' text='Manage users' />
                        <Tile link='http://fb.com' text='View all places' />
                    </div>
                </div>
            </div>
        )
    }
}

export default (Admin);