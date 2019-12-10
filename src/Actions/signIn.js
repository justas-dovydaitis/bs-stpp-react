import axios from 'axios';
import History from '../history.js';
import { actionTypes } from './index';
import authError from './authError';
import { API_ROOT } from '../config';

const signinUser = (credentials) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${API_ROOT}/login/`,
            {
                email: credentials.email,
                password: credentials.password
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then(response => {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: actionTypes.AUTH_USER });
               
                // - save the jwt token
                localStorage.setItem('accessToken', response.data.accessToken);

                // - redirect to the route '/feature'
                History.push('/');

            }).catch((error) => {
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Invalid credentials'));
            });
    };
};
export default signinUser;

