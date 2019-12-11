import axios from 'axios';
import setJWTexpiredVisibility from './setJWTexpiredVisibility';

import { API_ROOT } from '../config';

export default function apiUpdate(slug, headers, body) {
    return async (dispatch) => {
        return await axios.put(`${API_ROOT}${slug}`, body, {
            headers: {
                ...headers,
                'Content-Type': 'application/json',
                credentials: 'include',
                Authorization: localStorage.getItem('accessToken'),
            },
            crossDomain: true
        }).then((response) => {
            console.log('UPDATE', body, "Succeded", response);
            return response;
        }).catch((error) => {
            console.log(error);
            if (error.response && (error.response.status === 401)) {
                dispatch(setJWTexpiredVisibility(true));
            }
        });
    }
}
