import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from '../../redux_components/TextFiled'
import { reduxForm, Field } from 'redux-form'

const validate = function (values) {
    const errors = {}
    if (values.login == undefined || values.login.length < 3)
        errors.login = 'Invalid username'
    if (values.password == undefined || values.password.length < 3)
        errors.password = 'Invalid password'

    if (values.password != values.passwordRepeat)
        errors.passwordRepeat = 'Not matching password'


    return errors
}

@reduxForm({ form: 'register', validate })
export default class RegisterForm extends Component {
    render() {
        const { handleSubmit, error } = this.props
        return (
            <div>
                <h2>Register</h2>
                {remoteError && <div style={{color: 'red'}}>{remoteError}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name='login'
                            component={TextField}
                            floatingLabelText='Login'
                        />
                    </div>
                    <div>
                        <Field
                            name='password'
                            component={TextField}
                            floatingLabelText='Password'
                            type='password'
                        />
                    </div>
                    <div>
                        <Field
                            name='passwordRepeat'
                            component={TextField}
                            floatingLabelText='Password (repeat)'
                            type='password'
                        />
                    </div>
                    <div>
                        <RaisedButton
                            label='Register'
                            onClick={handleSubmit}
                            style={{ marginTop: 8 }}
                            primary
                        />
                    </div>
                </form>
            </div>
        )
    }
}