import React from 'react';
import { Route } from 'react-router-dom';
import App from '../App';
import Welcome from '../Components/Welcome';
import SignIn from '../Components/Authorization/SignIn';
import SignUp from '../Components/Authorization/SignUp';
import SignOut from '../Components/Authorization/SignOut';
import Agenda from '../Components/Agenda';
import Lecture from '../Components/Lecture';



const Routes = () => {
    return (
        <App>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signout" component={SignOut} />
            <Route exact path="/agenda" component={Agenda} />
            <Route exact path="/lecture" component={Lecture} />
        </App>
    );
};

export default Routes;
