import * as API from '../api/ApiProvider'
import * as actionTypes from './actions'
import moment from 'moment'

export function setFirstDay(day) {
    let firstDay = moment(day).startOf('isoWeek')
    return {
        type: actionTypes.SET_DAY,
        date: firstDay
    }
}

export function prevWeek() {
    return {
        type: actionTypes.CHANGE_WEEK,
        offset: -1
    }
}

export function nextWeek() {
    return {
        type: actionTypes.CHANGE_WEEK,
        offset: 1
    }
}

export function openNewAppointmentDialog() {
    return {
        type: actionTypes.OPEN_NEW_APPOINTMENT_DIALOG,
    }
}

export function openEditAppointmentDialog(appointment) {
    return {
        type: actionTypes.OPEN_EDIT_APPOINTMENT_DIALOG,
        appointment: appointment
    }
}

export function cancelDialog() {
    return {
        type: actionTypes.CLOSE_DIALOG,
    }
}

export function submitDialog(data) {
    return (dispatch) => {
        API.addAppointment.call(data, (err, res) => {
            if (err) console.error(err)
            dispatch({
                type: actionTypes.CLOSE_DIALOG,
            })
        })
    }
}



