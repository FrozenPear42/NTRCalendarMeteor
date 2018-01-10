import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from '../redux_components/TextFiled'
import TimePicker from '../redux_components/TimePicker'

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

@reduxForm({ form: 'appointment' })
export default class AppointmentDetailsDialog extends Component {

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
                            name='from'
                            component={TimePicker}
                            // format='24hr'
                            floatingLabelText='From'
                        />
                    </div>
                    <div>
                        <Field
                            name='to'
                            component={TimePicker}
                            // format='24hr'
                            floatingLabelText='To'
                        />
                    </div>
                    <div>
                        <Field
                            name='name'
                            component={TextField}
                            floatingLabelText="Name"
                            defaultValue="Default Value"
                        />
                    </div>
                    <div>
                        <Field
                            name='description'
                            component={TextField}
                            multiLine={true}
                            rows={2}
                            rowsMax={6}
                            floatingLabelText="Description"
                            defaultValue="Default Value"
                        />
                    </div>
                </form>
            </Dialog>
        )
    }
}