import { Authenticator } from '@/entities/domain/models/Authenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { v4 } from 'uuid'

export class InMemoryAuthenticator implements AuthenticatorRepository {
  protected authenticators: Array<Authenticator> = []

  async register (authenticator: Authenticator): Promise<boolean> {
    authenticator.id = v4()
    this.authenticators.push(authenticator)
    return true
  }

  async authenticate (authenticator: Authenticator): Promise<Authenticator | Error> {
    const foundAuthenticator = this.authenticators.find(auth => auth.email === authenticator.email)
    if (foundAuthenticator) {
      if (foundAuthenticator.password === authenticator.password) {
        return foundAuthenticator
      }
    }
    return new Error('Authenticação inválida')
  }
}
