import axios from 'axios';
import { signoutUser } from './index';

import { API_ROOT } from '../config';

export default function apiPush(slug, headers, body) {
    return async (dispatch) => {
        return axios.post(`${API_ROOT}${slug}`, body, {
            headers: {
                ...headers,
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            console.log('POST', body, "Succeded", response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(signoutUser());
            }
        });
    }
}