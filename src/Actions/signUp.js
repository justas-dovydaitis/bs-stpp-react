import axios from 'axios';
import History from '../history.js';
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';
import { actionTypes } from './index';
import authError from './authError';
import { API_ROOT } from '../config';

const signupUser = (credentials) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${API_ROOT}/users/`,
            {
                email: credentials.email,
                password: credentials.password,
                name: credentials.name
            })
            .then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                Cookie.set('refreshToken', response.data.refreshToken, { expires: new Date(jwt_decode(response.data.refreshToken).exp * 1000) })
                History.push('/');
            })
            .catch(err => {
                if (err.response)
                    dispatch(authError(err.response.data.error));
            });
    };
};

export default signupUser;