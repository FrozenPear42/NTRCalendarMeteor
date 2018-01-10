import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import calendar from './calendar.reducer'

const rootReducer = combineReducers({
    calendar,
    form: formReducer,
})

export default rootReducer