import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { reducer as authReducer } from './Auth';
import { reducer as agendaReducer } from './Agenda';
import { reducer as speakerReducer } from './Speakers';
import { reducer as drawerReducer } from './Drawer';
import { reducer as modalReducer } from './Modal';
const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    agenda: agendaReducer,
    speakers: speakerReducer,
    drawer: drawerReducer,
    modal: modalReducer,
});

export default rootReducer