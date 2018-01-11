import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from '../redux_components/TextFiled'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'


export default class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 'login',
            errorLogin: undefined,
            errorRegister: undefined,
        }
    }

    render() {
        const { page, errorLogin, errorRegister } = this.state
        console.log(errorLogin)
        console.log(errorRegister)
        return (
            <div>
                <AppBar title={'Calendar'} />
                <div>
                    <Paper zDepth={2} style={styles.formContainer}>
                        {page == 'login' &&
                            <div>
                                <LoginForm
                                    onSubmit={values => Meteor.loginWithPassword(values.login, values.password, error => { if (error) this.setState({ errorLogin: error.reason }) })}
                                    remoteError={errorLogin}
                                />
                                <div style={styles.link}>
                                    <a href='#' onClick={() => this.setState({ page: 'register', errorRegister: undefined })}>Create account</a>
                                </div>
                            </div>
                        }
                        {page == 'register' &&
                            <div>
                                <RegisterForm
                                    onSubmit={values => Accounts.createUser({ username: values.login, password: values.password }, error => { if (error) this.setState({ errorRegister: error.reason }) })}
                                    remoteError={errorRegister}
                                />
                                <div style={styles.link}>
                                    <a href='#' onClick={() => this.setState({ page: 'login', errorLogin: undefined })}>Login</a>
                                </div>
                            </div>
                        }

                    </Paper>
                </div>
            </div>
        )
    }
}
const styles = {
    formContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        marginBottom: '2%',
        width: '40%',
        padding: 16,
        justifyContent: 'center'
    },
    link: {
        marginTop: 10
    }
}