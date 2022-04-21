import { RegisterUserController } from '@/adapters/controllers/users/RegisterUserController'
import { Controller } from '@/adapters/http/contracts/Controller'
import { PGAuthenticatorRepository } from '@/external/repositories/PGAuthenticatorRepository'
import { PGUserRepository } from '@/external/repositories/PGUserRepository'
import { RegisterUserUseCase } from '@/usecases/domain/user/RegisterUserUseCase'

export const makeRegisterUserController = (): Controller => {
  const userRepository = new PGUserRepository()
  const authenticatorRepository = new PGAuthenticatorRepository()
  const registerUserUseCase = new RegisterUserUseCase(userRepository, authenticatorRepository)
  const registerUserController = new RegisterUserController(registerUserUseCase)
  return registerUserController
}
