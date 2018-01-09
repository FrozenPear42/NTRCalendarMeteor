import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { Tasks, Appointments } from '../api/ApiProvider'

import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

import DayPanel from './DayPanel'
import AppointmentDetailsDialog from './AppointmentDetailsDialog'

import moment from 'moment'

@withTracker(() => {
  return {
    tasks: Tasks.find({}).fetch(),
    appointments: Appointments.find({}).fetch()
  }
})

export default class App extends Component {

  renderGrid() {

    let today = moment()

    const header = (
      <tr>
        <td style={styles.tableHeaderMeta}><a href='#'>prev</a></td>
        <td style={styles.tableHeaderContent}>Poniedziałek</td>
        <td style={styles.tableHeaderContent}>Wtorek</td>
        <td style={styles.tableHeaderContent}>Środa</td>
        <td style={styles.tableHeaderContent}>Czwartek</td>
        <td style={styles.tableHeaderContent}>Piątek</td>
        <td style={styles.tableHeaderContent}>Sobota</td>
        <td style={styles.tableHeaderContent}>Niedziela</td>
        <td style={styles.tableHeaderMeta}><a href='#'>next</a></td>
      </tr>
    )

    let rows = []
    for (let r = 0; r < 4; ++r) {
      let row = []
      row.push(<td style={styles.tableMeta}>{moment(today).add('days', 7 * r).format('[W]WW YYYY')}</td>)
      for (let c = 0; c < 7; ++c)
        row.push(<td style={styles.tableConetent}><DayPanel day={moment(today).add('days', 7 * r + c)} appointments={[0, 1, 2, 3, 4, 5]} /></td>)
      row.push(<td style={styles.tableMeta}>{moment(today).add('days', 7 * r).format('[W]WW YYYY')}</td>)
      rows.push(<tr>{row}</tr>)

    }
    return (
      <div>
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