import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import date from './date.reducer'

const rootReducer = combineReducers({
    date,
    form: formReducer,
})

export default rootReducer