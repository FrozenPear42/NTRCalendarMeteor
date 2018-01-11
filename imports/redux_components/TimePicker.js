import React, { Component } from 'react'

import NTimePicker from 'material-ui/TimePicker'

export default class TimePicker extends Component {

    render() {
        let { input, meta, ...props } = this.props
        let { value, onChange, onFocus, onBlur } = input
        let { error, dirty, touched } = meta
        return (
            <NTimePicker
                {...props}
                format='24hr'
                onChange={(event, value) => onChange(value)}
                value={value}
                errorText={touched && error ? error : undefined}
            />
        )
    }
}