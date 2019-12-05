import { actionTypes } from './index';

const changeActivePlace = (newActive) => {
    return {
        type: actionTypes.CHANGE_ACTIVE_PLACE,
        payload: newActive
    };
};

export default changeActivePlace;