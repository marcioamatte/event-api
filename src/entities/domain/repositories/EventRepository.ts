import { Event } from '@/entities/domain/models/Event'
import { User } from '../models/User'

export interface EventRepository {
    register(event:Event): Promise<Event>
    eventsFromUser(user:User): Promise<Event[]>
}
