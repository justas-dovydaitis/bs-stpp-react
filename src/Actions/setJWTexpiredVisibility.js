import { actionTypes } from './index';

const setJWTexpiredVisibility = (open) => {

    return {
        type: actionTypes.SET_JWT_EXPIRED_VISIBILITY,
        payload: open
    };
};
export default setJWTexpiredVisibility;