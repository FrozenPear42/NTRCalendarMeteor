import * as actionTypes from './actions'
import moment from 'moment'

const initialState = {
    day: moment().startOf('isoWeek'),
    dialogOpened: false,
    selectedAppointment: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_DAY:
            return { ...state, day: action.day }

        case actionTypes.CHANGE_WEEK:
            let newDay = moment(state.day).add(action.offset, 'weeks')
            return { ...state, day: newDay }

        case actionTypes.OPEN_NEW_APPOINTMENT_DIALOG:
            return { ...state, dialogOpened: true, selectedAppointment: null }

        case actionTypes.OPEN_NEW_APPOINTMENT_DIALOG:
            return { ...state, dialogOpened: true, selectedAppointment: action.appointment }

        case actionTypes.CLOSE_DIALOG:
            return { ...state, dialogOpened: false, selectedAppointment: null }

        default:
            return state
    }
}