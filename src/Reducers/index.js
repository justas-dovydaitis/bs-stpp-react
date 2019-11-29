import { combineReducers } from 'redux';
import { reducer as userReducer } from './User';
import { reducer as authReducer } from './Auth';
 
const rootReducer = combineReducers({
    auth: authReducer,
    form: userReducer,
});

export default rootReducer