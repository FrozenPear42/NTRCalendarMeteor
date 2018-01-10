import React, { Component } from 'react'
import moment from 'moment'

export default class AppointmentItem extends Component {
    render() {
        const {onClick, appointment, style} = this.props
        const {name, description, day, start, end } = appointment
        return(
            <div style={style}>
                {name}
            </div>
        )
    }
}