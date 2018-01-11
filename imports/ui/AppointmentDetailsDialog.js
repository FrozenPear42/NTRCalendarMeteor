import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from '../redux_components/TextFiled'
import TimePicker from '../redux_components/TimePicker'
import moment from 'moment'
import { reduxForm, Field } from 'redux-form'


const validate = function (values) {
    const errors = {}
    if (values.name == undefined || values.name.length == 0)
        errors.name = 'name is required'

    if (values.description == undefined || values.description.length == 0)
        errors.description = 'name is required'

    if (moment(values.start).isAfter(moment(values.end)))
        errors.end = 'End after start'

    return errors
}

@reduxForm({
    form: 'appointment',
    fileds: ['name', 'description', 'day', 'start', 'end', 'version'],
    validate
})
export default class AppointmentDetailsDialog extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.visible != nextProps.visible) {
            const { reset, initialize } = this.props
            const { appointment, selectedDay } = nextProps
            reset()
            if (appointment)
                initialize({ ...appointment, version: appointment.version + 1 })
            else {
                let time = moment(0)
                time.year(2000).hour(0)
                initialize({ day: moment(selectedDay).toDate(), start: time.toDate(), end: time.toDate(), version: 0 })
            }
        }
    }


    render() {
        const { visible, handleSubmit, onCancel, onDelete, appointment, selectedDay } = this.props
        const day = appointment ? appointment.day : moment(selectedDay).toDate() || new Date()
        const newAppointment = !appointment

        const actions = [
            <FlatButton
                label="Delete"
                secondary={true}
                disabled={newAppointment}
                onClick={() => onDelete(appointment)}
            />,
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
                <p>{moment(day).format('DD MMMM YYYY')}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name='start'
                            component={TimePicker}
                            floatingLabelText='From'
                            autoOk
                        />
                    </div>
                    <div>
                        <Field
                            name='end'
                            component={TimePicker}
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