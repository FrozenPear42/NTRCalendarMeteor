import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { connect } from 'react-redux'

export default class AppointmentDetailsDialog extends Component {

    render() {
        const { visible } = this.props
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onClick={this.handleClose}
            />,
        ]

        return (
            <Dialog
                title="Edit appointment..."
                actions={actions}
                modal={true}
                open={visible}
            >
            {"asdadasdasd"}
            </Dialog>
        )
    }
}