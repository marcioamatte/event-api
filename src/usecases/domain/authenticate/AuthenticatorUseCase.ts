import { Authenticator } from '@/entities/domain/models/Authenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { Either, left, right } from '@/project/logic/Either'

export class AuthenticateUseCase {
  protected authenticatorRepository: AuthenticatorRepository
  constructor (authenticatorRepository: AuthenticatorRepository) {
    this.authenticatorRepository = authenticatorRepository
  }

  async authenticate (authenticator: Authenticator): Promise<Either<Error, Authenticator>> {
    const result = await this.authenticatorRepository.authenticate(authenticator)
    if (result.isLeft()) {
      return left(result.value)
    }
    return right(result.value)
  }
}
