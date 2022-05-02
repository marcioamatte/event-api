import { User } from '@/entities/domain/models/User'
import { UserRepository } from '@/entities/domain/repositories/UserRepository'
import { v4 } from 'uuid'

export class InMemoryUser implements UserRepository {
  private users: Array<User> = []

  async loadByEmail (email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async create (user: User): Promise<User> {
    user.id = v4()
    this.users.push(user)
    return user
  }

  async update (user: User): Promise<User> {
    const existentUser = this.users.findIndex(seekUser => seekUser.id === user.id)
    this.users[existentUser] = user
    return user
  }
}
