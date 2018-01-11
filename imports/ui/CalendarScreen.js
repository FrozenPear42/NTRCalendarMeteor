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

            row.push(<td style={styles.tableMeta} key={`r${r}c${0}`}>{moment(firstDay).add(7 * r, 'days').format('[W]WW YYYY')}</td>)
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
            row.push(<td style={styles.tableMeta} key={`r${r}c${8}`}>{moment(firstDay).add(7 * r, 'days').format('[W]WW YYYY')}</td>)

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
                        <table>
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
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2%',
        marginBottom: '2%',
        height: '80%',
    },
    tableHeaderMeta: {
        width: '3%',
        textAlign: 'center',
        backgroundColor: '#aaffaa',
        padding: 8
    },
    tableHeaderContent: {
        width: '8%',
        textAlign: 'center',
        backgroundColor: '#aaaaff',
        padding: 8
    },
    tableMeta: {
        width: '3%',
        textAlign: 'center',
        backgroundColor: '#aaaaff',
        padding: 8
    },
    tableConetent: {
        width: '8%',
        textAlign: 'flex-start',
        padding: 4,
        verticalAlign: 'top'
    },

}