import Cookie from 'js-cookie';
import History from '../history';

const signoutUser = () => {
    localStorage.removeItem('accessToken');
    Cookie.remove('refreshToken');

    setTimeout(() => {
        History.push('/');
    }, 2000);

};

export default signoutUser;