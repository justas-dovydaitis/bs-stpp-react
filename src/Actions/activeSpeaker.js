import { actionTypes } from './index';

const changeActiveSpeaker = (newActive) => {
    return {
        type: actionTypes.SET_CURRENT_SPEAKER,
        payload: newActive
    };
};

export default changeActiveSpeaker;