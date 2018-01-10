import React, { Component } from 'react'
import moment from 'moment'

export default class AppointmentItem extends Component {
    render() {
        const { onClick, appointment, style } = this.props
        const { name, description, day, start, end } = appointment
        return (
            <div style={style}>
                <a href='#' onClick={() => onClick()}>
                    <div>
                        {moment(start).format("HH:MM[ - ]")}
                        {moment(end).format("HH:MM[ ]")}
                        {name}
                    </div>
                </a>
            </div>

        )
    }
}