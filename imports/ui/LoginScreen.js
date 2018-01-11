import React, { Component } from 'react'
import AccountsUIWrapper from './AccountsUIWrapper'
import AppBar from 'material-ui/AppBar'

export default class LoginScreen extends Component {
    render() {
        return (
            <div>
                <AppBar title={'Calendar'} />
                <div>
                    <AccountsUIWrapper />
                </div>
            </div>
        )
    }
}