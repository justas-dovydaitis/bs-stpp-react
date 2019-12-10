// Modules
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// Components
import App from '../App';
import SignIn from '../Components/Authorization/SignIn';
import SignUp from '../Components/Authorization/SignUp';
import SignOut from '../Components/Authorization/SignOut';
import Agenda from '../Components/Agenda';
import Lecture from '../Components/Lecture';
import Speakers from '../Components/Speakers';
import Speaker from '../Components/Speakers/Speaker';
import Admin from '../Components/Admin';
import CreateLecture from '../Components/Admin/Forms/CreateLecture';
import CreateSpeaker from '../Components/Admin/Forms/CreateSpeaker';
import CreatePlace from '../Components/Admin/Forms/CreatePlace';

import AccessControl, { UserRoles } from '../Components/AccessControl';



const Routes = () => {
    return (
        <App>
            <AccessControl
                rolesAllowed={[UserRoles.all]}
                noAccessComponent={<h1>Access forbidden</h1>}
            >
                <Route exact path="/" component={Agenda} />
                <Route exact path="/lectures" component={Agenda} />
                <Route exact path="/lectures/:id" render={({ match }) => <Lecture match={match} />} />
                <Route exact path="/speakers" component={Speakers} />
                <Route exact path="/speakers/:id" render={({ match }) => <Speaker match={match} />} />
            </AccessControl>
            <AccessControl
                rolesAllowed={[UserRoles.guest]}
                noAccessComponent={<Route exact path="/signin" render={() => <Redirect to='/' />} />}>
                <Route exact path="/signin" component={SignIn} />

            </AccessControl>

            <AccessControl
                rolesAllowed={[UserRoles.guest]}
                noAccessComponent={<Route exact path="/signup" render={() => <Redirect to='/' />} />}>
                <Route exact path="/signup" component={SignUp} />
            </AccessControl>

            <AccessControl
                rolesAllowed={[UserRoles.admin, UserRoles.standard]}
                noAccessComponent={
                    <Route path="/signout" render={() => <Redirect to='/' />} />
                }
            >
                <Route exact path="/signout" component={SignOut} />
            </AccessControl>
            <AccessControl rolesAllowed={[UserRoles.admin]} noAccessComponent={''}>
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/add-speaker" component={CreateSpeaker} />
                <Route exact path="/add-lecture" component={CreateLecture} />
                <Route exact path="/add-place" component={CreatePlace} />
            </AccessControl>

        </App >
    );
};

export default Routes;
