import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from '../../redux_components/TextFiled'
import { reduxForm, Field } from 'redux-form'

const validate = function (values) {
    const errors = {}
    if (values.login == undefined || values.login.length < 3)
        errors.login = 'Invalid username'
    if (values.password == undefined || values.password.length <= 0)
        errors.password = 'Invalid password'
    return errors
}

@reduxForm({ form: 'login', validate })
export default class LoginForm extends Component {
    render() {
        const { handleSubmit, remoteError } = this.props
        return (
            <div>
                <h2>Login</h2>
                {remoteError && <div style={{ color: 'red' }}>{remoteError}</div>}
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
                        <RaisedButton
                            label='Login'
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