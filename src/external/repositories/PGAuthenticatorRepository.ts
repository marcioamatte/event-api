import { Authenticator } from '@/entities/domain/models/Authenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { Either, left, right } from '@/project/logic/Either'
import { PreparedStatement } from 'pg-promise'
import { db } from '@/external/database/Database'
import { HttpReponseError } from '@/adapters/errors/HttpResponseError'

const CREATE_AUTHENTICATOR_STATEMENT = 'INSERT INTO authenticator(user_email, user_password)VALUES($1, $2) returning *'
const AUTHENTICATE_STATEMENT = 'SELECT id, user_email as email FROM authenticator WHERE user_email=$1 AND user_password=crypt($2, user_password)'

type AuthenticatorResponse = Either<Error, Authenticator>
export class PGAuthenticatorRepository implements AuthenticatorRepository {
  async register (authenticator: Authenticator): Promise<boolean> {
    const statement = new PreparedStatement({ name: 'CREATE_AUTHENTICATOR_STATEMENT', text: CREATE_AUTHENTICATOR_STATEMENT, values: [authenticator.email, authenticator.password] })
    const newAuthenticator = await db.oneOrNone(statement)
    if (!newAuthenticator) return false
    return true
  }

  async authenticate (authenticator: Authenticator): Promise<AuthenticatorResponse> {
    const { email, password } = authenticator
    const statement = new PreparedStatement({ name: 'AUTHENTICATE_STATE', text: AUTHENTICATE_STATEMENT, values: [email, password] })
    const authenticate: Authenticator = await db.oneOrNone(statement)
    if (authenticate && authenticate.id) return right(authenticate)
    return left(new HttpReponseError('Usuário não autenticado'))
  }
}
