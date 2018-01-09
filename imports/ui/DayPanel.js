import React, { Component } from 'react'
import moment from 'moment'

export default class DayPanel extends Component {

    renderAppointmentPosition(appointment) {
        return (
            <div>
                asd
            </div>
        )
    }

    render() {
        const { day, appointments } = this.props
        const apps = appointments ? appointments.map(a => this.renderAppointmentPosition(a)) : []
        return (
            <div>
                <div>
                    {moment(day).format('DD MMMM')}
                </div>
                <div>
                    {apps}
                </div>
            </div>
        )
    }
}
