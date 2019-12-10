import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import signupUser from '../../Actions/signUp';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'
import logo from '../../Images/buildstuffLogo.png'

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error }
};
const mapDispatchToProps = dispatch => ({
    signupUser: (creds) => dispatch(signupUser(creds)),
})


class Signup extends PureComponent {

    handleFormSubmit(formProps) {
        console.log(formProps);
        this.props.signupUser(formProps)
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <div>
                <input className="form-control" {...input} placeholder={label} type={type} />
                {touched && error && <span className="text-danger">{error}</span>}
            </div>
        </div>
    );

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
        const { handleSubmit, submitting } = this.props;

        return (
            <div className='auth-wrap'>
                <Helmet>
                    <title>Sign up</title>
                    <meta name="description" content="Buildstuff signup" />
                </Helmet>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <img src={logo} className='logo' alt='logo' />
                    <fieldset className="form-group">
                        <Field
                            name="email"
                            label="Email"
                            component={this.renderField}
                            type="text" />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field
                            name="name"
                            label="Name"
                            component={this.renderField}
                            type="text" />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field
                            name="password"
                            label="Password"
                            component={this.renderField}
                            type="password" />
                    </fieldset>
                    <fieldset className="form-group">
                        <Field
                            name="passwordConfirmation"
                            label="Confirm password"
                            component={this.renderField}
                            type="password" />
                    </fieldset>
                    {this.renderError()}
                    <button type="submit" className="btn btn-primary w-100" disabled={submitting}>Sign up</button>

                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.username = 'Enter email';
    }

    if (!values.password) {
        errors.username = 'Enter password';
    }

    if (!values.passwordConfirmation) {
        errors.username = 'Enter password one more time';
    }

    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords does not match';
    }

    return errors;
};


export default reduxForm({
    form: 'signin',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(Signup));
