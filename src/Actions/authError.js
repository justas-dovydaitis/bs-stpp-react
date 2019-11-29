import { actionTypes } from './index';

const authError = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        payload: error
    };
};
export default authError;