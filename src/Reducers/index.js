import { combineReducers } from 'redux';
import { reducer as userReducer } from './User';
import { reducer as authReducer } from './Auth';
import { reducer as agendaReducer } from './Agenda';
import { reducer as speakerReducer } from './Speakers';
import { reducer as drawerReducer } from './Drawer';
const rootReducer = combineReducers({
    auth: authReducer,
    form: userReducer,
    agenda: agendaReducer,
    speakers: speakerReducer,
    drawer: drawerReducer,
});

export default rootReducer