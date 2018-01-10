import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { Tasks, Appointments } from '../api/ApiProvider'
import AppBar from 'material-ui/AppBar'
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
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(calendarActions, dispatch)
  }
}

function mapTracker() {
  return {
    appointments: Appointments.find({}).fetch()
  }
}

@withTracker(mapTracker)
@connect(mapState, mapDispatch)
export default class App extends Component {

  renderGrid() {

    const { firstDay, dialogOpened, selectedAppointment, actions, appointments } = this.props

    const header = (
      <tr>
        <td style={styles.tableHeaderMeta}><a href='#' onClick={() => { actions.prevWeek(); return true }}>prev</a></td>
        <td style={styles.tableHeaderContent}>Poniedziałek</td>
        <td style={styles.tableHeaderContent}>Wtorek</td>
        <td style={styles.tableHeaderContent}>Środa</td>
        <td style={styles.tableHeaderContent}>Czwartek</td>
        <td style={styles.tableHeaderContent}>Piątek</td>
        <td style={styles.tableHeaderContent}>Sobota</td>
        <td style={styles.tableHeaderContent}>Niedziela</td>
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
              onNewClicked={() => actions.openNewAppointmentDialog()}
            />
          </td>
        )
      row.push(<td style={styles.tableMeta} key={`r${r}c${8}`}>{moment(firstDay).add(7 * r, 'days').format('[W]WW YYYY')}</td>)

      rows.push(<tr key={'row ' + r}>{row}</tr>)

    }
    return (
      <div>
        <AppointmentDetailsDialog
          visible={dialogOpened}
          onCancel={() => actions.cancelDialog()}
          onSubmit={(data) => actions.submitDialog(data)}
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
    )
  }

  render() {
    const { appointments } = this.props
    return (
      <div>
        <AppBar title={'Calendar'} />
        <div>
          {this.renderGrid()}
        </div>
      </div>
    );
  }
}

const styles = {
  tableContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',

    marginTop: '2%',
    height: '80%',
    width: '80%'
  },
  tableHeaderMeta: {
    width: '5%',
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
    width: '5%',
    textAlign: 'center',
    backgroundColor: '#aaaaff',
    padding: 8
  },

  tableConetent: {
    width: '8%',
    textAlign: 'center',
    padding: 4
  },

}