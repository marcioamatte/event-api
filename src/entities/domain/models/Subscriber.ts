import { Event } from '../models/Event'

export class Subscriber {
  id?:string
  name:string
  email:string
  event:Event

  constructor (id:string, name:string, email:string, event:Event) {
    this.id = id
    this.name = name
    this.email = email
    this.event = event
  }
}
