import axios from 'axios';
import { signoutUser } from './index';
import { API_ROOT } from '../config';

export default function apiDelete(slug, headers, id) {
    return async (dispatch) => {
        return axios.delete(`${API_ROOT}${slug}${id}/`, {
            headers: {
                ...headers,
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            console.log('POST', "Succeded", response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(setJWTexpiredVisibility(true));
            }
        });
    }
}