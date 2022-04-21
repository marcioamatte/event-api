import { Authenticator } from '@/entities/domain/models/Authenticator'
import { User } from '@/entities/domain/models/User'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { UserRepository } from '@/entities/domain/repositories/UserRepository'
import { Either, left, right } from '@/project/logic/Either'

export type UserDTO = {
    name: string
    email: string
    password: string
}

type UserRegistered = Either<Error, User>

export class RegisterUserUseCase {
  protected userRepository:UserRepository
  protected authenticatorRepository: AuthenticatorRepository

  constructor (userRepository: UserRepository, authenticatorRepository: AuthenticatorRepository) {
    this.userRepository = userRepository
    this.authenticatorRepository = authenticatorRepository
  }

  async registerUser ({ name, email, password }: UserDTO): Promise<UserRegistered> {
    let user = await this.userRepository.loadByEmail(email)
    if (user) return left(new Error('Usuário já registrado'))
    user = await this.userRepository.create(new User('', name, email))
    const newAuthenticator = await this.authenticatorRepository.register(new Authenticator(null, email, password))
    if (!newAuthenticator) return left(new Error('Erro ao registrar autenticador'))
    return right(user)
  }
}
