import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { Tasks, Appointments } from '../api/ApiProvider'

import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

import Task from './Task.js'
import DayPanel from './Task.js'


@withTracker(() => {
  return {
    tasks: Tasks.find({}).fetch(),
    appointments: Appointments.find({}).fetch()
  }
})

export default class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderGrid() {

    const header = (
      <tr>
        <td>prev</td>
        <td>Poniedziałek</td>
        <td>Wtorek</td>
        <td>Środa</td>
        <td>Czwartek</td>
        <td>Piątek</td>
        <td>Sobota</td>
        <td>Niedziela</td>
        <td>next</td>
      </tr>
    )

    let rows = []
    for (let r = 0; r < 4; ++r) {
      let row = []
      row.push(<td>as</td>)

      for (let c = 0; c < 7; ++c)
        row.push(<td>{c}</td>)

      row.push(<td>as</td>)
      rows.push(<tr>{row}</tr>)


    }
    return (
      <Paper zDepth={2} style={styles.tableContainer}>
        <table>
          <tbody>
          {header}
          {rows}
          {header}
          </tbody>
        </table>
      </Paper>
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
  }
}