import axios from 'axios';
import History from '../history.js';
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
                localStorage.setItem('token', response.data.token);
                dispatch({ type: actionTypes.AUTH_USER });
                History.push('/');
            })
            .catch(err => {
                if (err.response)
                    dispatch(authError(err.response.data.error));
            });
    };
};

export default signupUser;