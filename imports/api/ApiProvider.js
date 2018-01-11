import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

export const Appointments = new Mongo.Collection('appointments')
Appointments.schema = new SimpleSchema({
    name: { type: String },
    description: { type: String },
    day: { type: Date },
    start: { type: Date },
    end: { type: Date },
    owner: {type: String}
})

if (Meteor.isServer) {
    Meteor.publish('appointments', function appointmentsPublication() {
      return Appointments.find({owner: this.userId})
    })
  }

export const addAppointment = new ValidatedMethod({
    name: 'appointments.addAppointment',
    validate: Appointments.schema.validator(),
    run(appointment) {
        Appointments.insert(appointment)
    }
})

export const upsertAppointment = new ValidatedMethod({
    name: 'appointments.upsertAppointment',
    validate: Appointments.schema.validator(),
    run(appointment) {
        // Appointments.update()
    }
})

export const removeAppointment = new ValidatedMethod({
    name: 'appointments.removeAppointment',
    validate: null,
    run(appointment) {
        Appointments.remove(appointment._id)
    }
})

