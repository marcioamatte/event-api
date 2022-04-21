import { User } from '@/entities/domain/models/User'
import { UserRepository } from '@/entities/domain/repositories/UserRepository'
import { db } from '@/external/database/Database'
import { PreparedStatement } from 'pg-promise'

const CREATE_USER_STATEMENT = 'INSERT INTO users(user_name,user_email)VALUES($1,$2) returning *'
const LOAD_BY_EMAIL_STATEMENT = 'SELECT * FROM users WHERE user_email=$1'

export class PGUserRepository implements UserRepository {
  async loadByEmail (email: string): Promise<Boolean | User> {
    const statement = new PreparedStatement({ name: 'LOAD_BY_EMAIL_STATEMENT', text: LOAD_BY_EMAIL_STATEMENT, values: [email] })
    const hasUser = await db.oneOrNone(statement)
    if (!hasUser) return false
    return new User(hasUser.id, hasUser.user_name, hasUser.user_email)
  }

  async create (user: User): Promise<User> {
    const statement = new PreparedStatement({ name: 'CREATE_USER_STATEMENT', text: CREATE_USER_STATEMENT, values: [user.name, user.email] })
    const newUser = await db.one(statement)
    return new User(newUser.id, newUser.user_name, newUser.user_email)
  }

  async update (user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
}
