import { User } from '../models/User'

export interface UserRepository {
    loadByEmail(email:string): Promise<User | Boolean>
    create(user:User): Promise<User>
    update(user:User): Promise<User>
}
