import { User } from './User'

export class Event {
  id?: string
  description: string
  eventStart: Date
  eventEnd: Date
  owner: User

  constructor (id:string, description:string, eventStart:Date, eventEnd:Date, owner:User) {
    this.id = id
    this.description = description
    this.eventStart = eventStart
    this.eventEnd = eventEnd
    this.owner = owner
  }
}
