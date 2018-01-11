import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import CalendarScreen from './CalendarScreen'
import LoginScreen from './LoginScreen'

function mapTracker() {
  Meteor.subscribe('appointments')
  return {
    currentUser: Meteor.user(),
  }
}

@withTracker(mapTracker)
export default class App extends Component {
  render() {
    const { currentUser } = this.props
    return (
      <div>
        {currentUser ? <CalendarScreen /> : <LoginScreen />}
      </div>
    )
  }
}