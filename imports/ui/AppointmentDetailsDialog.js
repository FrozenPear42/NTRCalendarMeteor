import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from '../redux_components/TextFiled'
import TimePicker from '../redux_components/TimePicker'

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

@reduxForm({
    form: 'appointment',
    fileds: ['name', 'description', 'day', 'start', 'end'],
    initialValues: { start: new Date(0), end: new Date(0), day: new Date() }
})
export default class AppointmentDetailsDialog extends Component {

    componentDidMount() {
        const { reset, initialize, appointment } = this.props
        reset()
        if (appointment) {
            initialize(appointment)
        }
    }

    render() {
        const { visible, handleSubmit, onCancel } = this.props
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => onCancel()}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                // disabled={true}
                onClick={handleSubmit}
            />,
        ]

        return (
            <Dialog
                title="Edit appointment..."
                actions={actions}
                modal={true}
                open={visible}
            >
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name='start'
                            component={TimePicker}
                            // format='24hr'
                            floatingLabelText='From'
                            autoOk
                        />
                    </div>
                    <div>
                        <Field
                            name='end'
                            component={TimePicker}
                            // format='24hr'
                            floatingLabelText='To'
                            autoOk
                        />
                    </div>
                    <div>
                        <Field
                            name='name'
                            component={TextField}
                            floatingLabelText='Name'
                        />
                    </div>
                    <div>
                        <Field
                            name='description'
                            component={TextField}
                            multiLine={true}
                            rows={2}
                            rowsMax={6}
                            floatingLabelText='Description'
                        />
                    </div>
                </form>
            </Dialog>
        )
    }
}