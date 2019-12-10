import axios from 'axios';
import Cookie from 'js-cookie';
import History from '../history.js';
import jwt_decode from 'jwt-decode';
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
                Cookie.set('refreshToken',response.data.refreshToken,{expires: new Date(jwt_decode(response.data.refreshToken).exp * 1000)})
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

