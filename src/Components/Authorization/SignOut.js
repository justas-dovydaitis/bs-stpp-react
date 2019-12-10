import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import signoutUser from '../../Actions/signOut';

class Signout extends PureComponent {

    componentDidMount() {
        signoutUser();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Sign out</title>
                    <meta name="description" content="" />
                </Helmet>
                <h1 className='display-1 text-white'> Sorry to see you go ...</h1>
                <strong className='text-white'>Will be redirected to agenda in few seconds...</strong>
            </div>
        )
    }
}

export default (Signout);
