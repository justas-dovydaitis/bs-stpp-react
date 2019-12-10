import { actionTypes } from '../Actions';
const defaultState = { open: false, update: 0 };
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DRAWER:
            return { ...state, open: action.payload }
        case actionTypes.UPDATE_DRAWER:
            return { ...state, update: state.update++ }
        default:
            return state;
    }
};