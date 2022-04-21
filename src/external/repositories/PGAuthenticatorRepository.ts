import { Authenticator } from '@/entities/domain/models/Authenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { Left, Right } from '@/project/logic/Either'
import { PreparedStatement } from 'pg-promise'
import { db } from '@/external/database/Database'

const CREATE_AUTHENTICATOR_STATEMENT = 'INSERT INTO authenticator(user_email, user_password)VALUES($1, $2) returning *'

export class PGAuthenticatorRepository implements AuthenticatorRepository {
  async register (authenticator: Authenticator): Promise<boolean> {
    const statement = new PreparedStatement({ name: 'CREATE_AUTHENTICATOR_STATEMENT', text: CREATE_AUTHENTICATOR_STATEMENT, values: [authenticator.email, authenticator.password] })
    const newAuthenticator = await db.oneOrNone(statement)
    if (!newAuthenticator) return false
    return true
  }

  authenticate (authenticator: Authenticator): Promise<Left<Error, Authenticator> | Right<Error, Authenticator>> {
    throw new Error('Method not implemented.')
  }
}
