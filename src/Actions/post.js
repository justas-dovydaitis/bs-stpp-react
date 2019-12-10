import axios from 'axios';
import signoutUser from './signOut';

import { API_ROOT } from '../config';

export default function apiPush(slug, headers, body) {
    return async (dispatch) => {
        return await axios.post(`${API_ROOT}${slug}`, body, {
            headers: {
                ...headers,
                'Content-Type':'application/json',
                credentials: 'include'
                // Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            setTimeout()
            console.log('POST', body, "Succeded", response);
            return response;
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                dispatch(signoutUser());
            }
        });
    }
}