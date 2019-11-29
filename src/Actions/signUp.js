import axios from 'axios';
import History from '../history.js';
import { actionTypes } from './index';
import authError from './authError';
import { API_ROOT } from '../config';

const signupUser = (credentials) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${API_ROOT}/rest/team/`,
            {
                username: credentials.username,
                password: credentials.password,
                key: '000'
            })
            .then(response => {
                dispatch({ type: actionTypes.AUTH_USER });
                localStorage.setItem('token', response.data.token);
                History.push('/');
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
};

export default signupUser;