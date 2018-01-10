import React, { Component } from 'react'
import AppointmentItem from './AppointmentItem'
import moment from 'moment'


export default class DayPanel extends Component {

    render() {
        const { day, appointments, onNewClicked } = this.props
        const apps = appointments ? appointments.map((a, idx) => <AppointmentItem onClick={() => alert('asd')} appointment={a} style={styles.appointment} key={idx} />) : []
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
