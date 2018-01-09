export default class Appointment {
    
    constructor(name, description, day, from, to) {
        this.name = name
        this.description = description
        this.day = day
        this.from = from
        this.to = to
    }

    get toString() {
        return `${this.name}`
    }
}