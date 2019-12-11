import { actionTypes } from '../Actions';
const defaultState = {
    agendaPlaces: [],
    lectures: [],
    currentLectureSpeakers: [],
    agendaActivePlace: {}
}
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_ACTIVE_PLACE:
            return { ...state, agendaActivePlace: action.payload }
        case actionTypes.SET_AGENDA_PLACES:
            return { ...state, agendaPlaces: action.payload }
        case actionTypes.SET_LECTURES:
            return { ...state, lectures: action.payload }
        case actionTypes.SET_CURRENT_LECTURE:
            return { ...state, currentLecture: action.payload }
        case actionTypes.SET_CURRENT_LECTURE_SPEAKERS:
            return { ...state, currentLectureSpeakers: action.payload };
        default:
            return state;
    }
};