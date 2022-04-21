import { Authenticator } from '@/entities/domain/models/Authenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { Left, Right } from '@/project/logic/Either'
import { v4 } from 'uuid'

export class InMemoryAuthenticator implements AuthenticatorRepository {
  protected authenticators: Array<Authenticator> = []

  async register (authenticator: Authenticator): Promise<boolean> {
    authenticator.id = v4()
    this.authenticators.push(authenticator)
    return true
  }

  authenticate (authenticator: Authenticator): Promise<Left<Error, Authenticator> | Right<Error, Authenticator>> {
    throw new Error('Method not implemented.')
  }
}
