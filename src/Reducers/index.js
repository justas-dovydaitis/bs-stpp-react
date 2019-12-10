import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { reducer as authReducer } from './Auth';
import { reducer as agendaReducer } from './Agenda';
import { reducer as speakerReducer } from './Speakers';
import { reducer as drawerReducer } from './Drawer';
const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    agenda: agendaReducer,
    speakers: speakerReducer,
    drawer: drawerReducer,

});

export default rootReducer