/* eslint-disable no-undef */
import axios from 'axios';
import signoutUser from './signOut';
import { API_ROOT } from '../config';

export default function apiGet(slug, headers, type) {
    return async (dispatch) => {
        return axios.get(`${API_ROOT}${slug}`, {
            headers: {
                ...headers,
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            console.log(type, 'Succeded', response.data);
            dispatch(apiStore(type, response.data));
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                dispatch(signoutUser());
            }
            console.log(error.response);
        });
    }
}
export function apiStore(type, data) {
    return {
        type: type,
        payload: data
    };
}