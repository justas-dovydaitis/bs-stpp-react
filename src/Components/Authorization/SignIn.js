import React from 'react';
import { Field, reduxForm } from 'redux-form';
import signinUser from '../../Actions/signIn';
import { connect } from 'react-redux';

import './style.css';
import logo from '../../Images/buildstuffLogo.png'


const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
};
const mapDispatchToProps = dispatch => ({
    signinUser: (creds) => dispatch(signinUser(creds)),
})

class SignIn extends React.PureComponent {

    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email: email, password: password })
    }
    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <string>Oops! {this.props.errorMessage}</string>
                </div>
            );
        }
    }
    render() {
        const { handleSubmit } = this.props;

        return (
            <div className='auth-wrap'>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <img src={logo} className='logo' alt='logo' />
                    <fieldset className="form-group">
                        <label>Email</label>
                        <Field className="form-control" name="email" component="input" type="text" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password</label>
                        <Field className="form-control" name="password" component="input" type="password" />
                    </fieldset>
                    {this.renderError()}
                    <button action="submit" className="btn btn-primary w-100">Sign in</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'signin'
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));