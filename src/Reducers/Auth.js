import { actionTypes } from '../Actions';

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.AUTH_USER:
            return { ...state, error: '', authenticated: true }

        case actionTypes.AUTH_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }
};