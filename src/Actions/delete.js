import axios from 'axios';
import setJWTexpiredVisibility from './setJWTexpiredVisibility';
import { API_ROOT } from '../config';

export default function apiDelete(slug, headers, ) {
    return async (dispatch) => {
        return axios.delete(`${API_ROOT}${slug}`, {
            headers: {
                ...headers,
                Authorization: localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => {
            debugger;
            console.log('POST', "Succeded", response.data);
        }).catch((error) => {
            debugger;
            console.log(error);
            if (error.response && (error.response.status === 401)) {
                dispatch(setJWTexpiredVisibility(true));
            }
        });
    }
}