import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import History from './history.js';
import Routes from './Routes';
// import { AUTH_USER } from './Actions/';

import rootReducer from './Reducers';

import './style.css';

import registerServiceWorker from './serviceWorker';


// UNCOMMENT IT FOR PRODUCTION
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(rootReducer);


/* COMMENT IT OUT FOR PRODUCTION */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);


const token = localStorage.getItem('token');
// if we have a token, consiger the user to be signed in
if (token) {
    // we need to update application state
    // store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Router history={History} forceRefresh={false}>
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
