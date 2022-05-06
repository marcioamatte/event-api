import { AuthenticatorController } from '@/adapters/controllers/users/AuthenticatorController'
import { Controller } from '@/adapters/http/contracts/Controller'
import { PGAuthenticatorRepository } from '@/external/repositories/PGAuthenticatorRepository'
import { AuthenticateUseCase } from '@/usecases/domain/authenticate/AuthenticatorUseCase'

export const makeAuthenticatorController = (): Controller => {
  const authenticatorRepository = new PGAuthenticatorRepository()
  const authenticatorUseCase = new AuthenticateUseCase(authenticatorRepository)
  const authenticatorController = new AuthenticatorController(authenticatorUseCase)
  return authenticatorController
}
