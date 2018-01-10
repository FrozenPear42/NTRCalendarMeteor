import React, { Component } from 'react'
import AppointmentItem from './AppointmentItem'
import moment from 'moment'


export default class DayPanel extends Component {

    render() {
        const { day, appointments, onNewClicked, onExistingClicked } = this.props
        const apps = appointments ?
            appointments.filter(a => moment(a.day).isSame(moment(day)))
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map((a, idx) =>
                    <AppointmentItem
                        onClick={() => onExistingClicked(a)}
                        appointment={a}
                        style={styles.appointment}
                        key={idx}
                    />)
            : []
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    {moment(day).format('DD MMMM')}
                    <a href='#' onClick={() => { onNewClicked(day); return true }}>+</a>
                </div>
                <div>
                    {apps}
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 2,
        borderStyle: 'solid',
        padding: 4
    },
    header: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 2,
        borderStyle: 'solid',
        padding: 4
    },
    appointment: {
        color: '#fff',
        backgroundColor: '#33a',
        borderColor: '#33a',
        borderWidth: 1,
        borderRadius: 2,
        borderStyle: 'solid',
        padding: 4,
        marginTop: 2,

    },
}
