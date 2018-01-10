import * as actionTypes from './actions'
import moment from 'moment'

export function setFirstDay(day) {
    let firstDay = 'a'
    return {
        type: actionTypes.SET_TIME,
        date: day
    }
}