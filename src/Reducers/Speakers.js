import { actionTypes } from '../Actions';
const defaultState = {
    speakers: [],

}
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_SPEAKERS:
            return { ...state, speakers: action.payload }
        case actionTypes.SET_CURRENT_SPEAKER:
            return { ...state, currentSpeaker: action.payload }
        case actionTypes.SET_CURRENT_SPEAKER_LECTURES:
            return { ...state, currentSpeakerLectures: action.payload };
        default:
            return state;
    }
};