import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


import App from '../imports/ui/App.js'

const rootReducer = combineReducers({
  form: formReducer
})

const middleware = [
  thunk,
  logger
]

const store = createStore(rootReducer, undefined, applyMiddleware(...middleware))

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
    ,
    document.getElementById('render-target'));
})