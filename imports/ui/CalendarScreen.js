import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { Tasks, Appointments } from '../api/ApiProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import DayPanel from './DayPanel'
import AppointmentDetailsDialog from './AppointmentDetailsDialog'

import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as calendarActions from '../redux/calendar.actions'

function mapState(state, ownProps) {
    return {
        firstDay: state.calendar.day,
        dialogOpened: state.calendar.dialogOpened,
        selectedAppointment: state.calendar.selectedAppointment,
        selectedDay: state.calendar.selectedDay,
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(calendarActions, dispatch)
    }
}

function mapTracker() {
    Meteor.subscribe('appointments')

    return {
        appointments: Appointments.find({}).fetch(),
        currentUser: Meteor.user(),
    }
}

@withTracker(mapTracker)
@connect(mapState, mapDispatch)
export default class CalendarScreen extends Component {

    componentDidMount() {
        const { actions } = this.props
        actions.setFirstDay(moment())
    }

    render() {
        const { currentUser, firstDay, dialogOpened, selectedAppointment, selectedDay, actions, appointments } = this.props

        if (selectedAppointment != null) {
            let app = appointments.filter(a => a._id == selectedAppointment._id)
            if (app.length != 0 && selectedAppointment.version != app[0].version)
                actions.refreshSelectedAppointment(appointments.filter(a => a._id == selectedAppointment._id)[0])
        }

        const header = (
            <tr>
                <td style={styles.tableHeaderMeta}><a href='#' onClick={() => { actions.prevWeek(); return true }}>prev</a></td>
                <td style={styles.tableHeaderContent}>Monday</td>
                <td style={styles.tableHeaderContent}>Tuesday</td>
                <td style={styles.tableHeaderContent}>Wednesday</td>
                <td style={styles.tableHeaderContent}>Thursday</td>
                <td style={styles.tableHeaderContent}>Friday</td>
                <td style={styles.tableHeaderContent}>Saturady</td>
                <td style={styles.tableHeaderContent}>Sunday</td>
                <td style={styles.tableHeaderMeta}><a href='#' onClick={() => { actions.nextWeek(); return true }}>next</a></td>
            </tr>
        )

        let rows = []
        for (let r = 0; r < 4; ++r) {
            let row = []

            row.push(<td style={styles.tableMeta} key={`r${r}c${0}`}>
                <div>
                    {moment(firstDay).add(7 * r, 'days').format('[W]WW')}
                </div>
                <div>
                    {moment(firstDay).add(7 * r, 'days').format('YYYY')}
                </div>
            </td>)
            for (let c = 0; c < 7; ++c)
                row.push(
                    <td
                        style={styles.tableConetent}
                        key={`r${r}c${c + 1}`}
                    >
                        <DayPanel
                            day={moment(firstDay).add(7 * r + c, 'days')}
                            appointments={appointments}
                            onNewClicked={day => actions.openNewAppointmentDialog(day)}
                            onExistingClicked={appointment => actions.openEditAppointmentDialog(appointment)}
                        />
                    </td>
                )
            row.push(<td style={styles.tableMeta} key={`r${r}c${8}`}>
                <div>
                    <div>
                        {moment(firstDay).add(7 * r, 'days').format('[W]WW')}
                    </div>
                    <div>
                        {moment(firstDay).add(7 * r, 'days').format('YYYY')}
                    </div>
                </div>
            </td>)

            rows.push(<tr key={'row ' + r}>{row}</tr>)

        }

        return (
            <div>
                <AppBar
                    title={'Calendar - ' + currentUser.username}
                    iconElementRight={<FlatButton label="Log Out" onClick={() => Meteor.logout()} />}
                />
                <div>
                    <AppointmentDetailsDialog
                        visible={dialogOpened}
                        onCancel={() => actions.cancelDialog()}
                        onSubmit={data => actions.submitDialog(data)}
                        onDelete={appointment => actions.deleteAppointment(appointment)}
                        appointment={selectedAppointment}
                        selectedDay={selectedDay}
                    />
                    <Paper zDepth={2} style={styles.tableContainer}>
                        <table style={{width: '100%', tableLayout: 'fixed'}}>
                            <tbody>
                                {header}
                                {rows}
                                {header}
                            </tbody>
                        </table>
                    </Paper>
                </div>
            </div>
        );
    }
}

const styles = {

    tableContainer: {
        marginLeft: '2%',
        marginRight: '2%',
        marginTop: '2%',
        marginBottom: '2%',
        display: 'flex'
        // width: '90%'
    },
    tableHeaderMeta: {
        width: '4.5%',
        textAlign: 'center',
        backgroundColor: '#aaffaa',
        padding: 8
    },
    tableHeaderContent: {
        width: '13%',
        textAlign: 'center',
        backgroundColor: '#aaaaff',
        padding: 8
    },
    tableMeta: {
        textAlign: 'center',
        verticalAlign: 'center',
        backgroundColor: '#aaaaff',
        padding: 8
    },
    tableConetent: {
        textAlign: 'flex-start',
        verticalAlign: 'top',
        padding: 0,
    },

}