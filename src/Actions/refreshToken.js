import axios from 'axios';
import { API_ROOT } from '../config';
import Cookie from 'js-cookie';

const refreshToken = () => {
    return axios.post(`${API_ROOT}/token`, {}, {
        headers: {
            Authorization: Cookie.getJSON('refreshToken'),
            'Content-Type': 'application/json',
            credentials: 'include',
        }
    })
        .then(response => {
            localStorage.setItem('accessToken', response.data.accessToken);
        })
        .catch(error => {
            console.log(error)
        })
}
export default refreshToken