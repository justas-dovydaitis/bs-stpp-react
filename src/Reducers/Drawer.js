import { actionTypes } from '../Actions';
const defaultState = { open: false };
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DRAWER:
            return { ...state, open: action.payload }
        default:
            return state;
    }
};