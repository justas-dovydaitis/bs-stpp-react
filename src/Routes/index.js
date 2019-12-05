// Modules
import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
import NotFound from '../Components/NotFound';
import CreateLectureForm from '../Components/Admin/Forms/CreateLecture';
import CreateSpeaker from '../Components/Admin/Forms/CreateSpeaker';



const Routes = () => {
    return (
        <App>
            <Switch>
                <Route exact path="/" component={Agenda} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signout" component={SignOut} />

                <Route exact path="/lectures" component={Agenda} />
                <Route exact path="/lectures/:id" render={({ match }) => <Lecture match={match} />} />
                <Route exact path="/speakers" component={Speakers} />
                <Route exact path="/speakers/:id" render={({ match }) => <Speaker match={match} />} />

                <Route exact path="/admin" component={Admin} />
                <Route exact path="/form" component={CreateSpeaker} />
                <Route component={NotFound} />
            </Switch>
        </App>

    );
};

export default Routes;
