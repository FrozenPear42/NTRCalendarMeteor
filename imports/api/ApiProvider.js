import { Mongo } from 'meteor/mongo'

export const Tasks = new Mongo.Collection('tasks')
export const Appointments = new Mongo.Collection('appointments')

