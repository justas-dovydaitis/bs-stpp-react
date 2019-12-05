import { combineReducers } from 'redux';
import { reducer as userReducer } from './User';
import { reducer as authReducer } from './Auth';
import { reducer as agendaReducer } from './Agenda';
import { reducer as speakerReducer } from './Speakers';

const rootReducer = combineReducers({
    auth: authReducer,
    form: userReducer,
    agenda: agendaReducer,
    speakers: speakerReducer,
});

export default rootReducer