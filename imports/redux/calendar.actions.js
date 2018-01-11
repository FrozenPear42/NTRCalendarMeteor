import * as API from '../api/ApiProvider'
import * as actionTypes from './actions'
import moment from 'moment'

export function setFirstDay(day) {
    let firstDay = moment(day).startOf('isoWeek')
    firstDay.hours(0).minutes(0).seconds(0).milliseconds(0)
    return {
        type: actionTypes.SET_DAY,
        day: firstDay
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

export function openNewAppointmentDialog(day) {
    return {
        type: actionTypes.OPEN_NEW_APPOINTMENT_DIALOG,
        day: day
    }
}

export function openEditAppointmentDialog(appointment) {
    return {
        type: actionTypes.OPEN_EDIT_APPOINTMENT_DIALOG,
        appointment: appointment,
        day: appointment.day
    }
}

export function cancelDialog() {
    return {
        type: actionTypes.CLOSE_DIALOG,
    }
}

export function submitDialog(data) {
    if (!data.owner)
        data = { ...data, owner: Meteor.userId() }
    return (dispatch) => {
        API.upsertAppointment.call(data, (err, res) => {
            if (err) console.error(err)
            dispatch({
                type: actionTypes.CLOSE_DIALOG,
            })
        })
    }
}

export function deleteAppointment(appointment) {
    return (dispatch) => {
        API.removeAppointment.call(appointment, (err, res) => {
            if (err) console.error(err)
            dispatch({
                type: actionTypes.CLOSE_DIALOG,
            })
        })
    }
}



