import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import rootReducer from '../imports/redux/reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import moment from 'moment/min/moment-with-locales'

import App from '../imports/ui/App.js'


const middleware = [
  thunk,
  logger
]

const store = createStore(rootReducer, undefined, applyMiddleware(...middleware))

Meteor.startup(() => {
  moment.locale('pl')
  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('render-target'));
})