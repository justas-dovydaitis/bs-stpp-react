import { actionTypes } from './index';

const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: actionTypes.UNAUTH_USER };
};

export default signoutUser;