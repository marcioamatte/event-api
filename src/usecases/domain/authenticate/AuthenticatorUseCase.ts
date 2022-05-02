import { Authenticator } from '@/entities/domain/models/Authenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'

export class AuthenticateUseCase {
  protected authenticatorRepository: AuthenticatorRepository
  constructor (authenticatorRepository: AuthenticatorRepository) {
    this.authenticatorRepository = authenticatorRepository
  }

  async authenticate (authenticator: Authenticator): Promise<Authenticator | Error> {
    const result = await this.authenticatorRepository.authenticate(authenticator)
    return result
  }
}
