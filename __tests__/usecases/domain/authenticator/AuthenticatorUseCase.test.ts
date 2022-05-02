import { InMemoryAuthenticator } from './../user/InMemoryAuthenticator'
import { AuthenticatorRepository } from '@/entities/domain/repositories/AuthenticatorRepository'
import { AuthenticateUseCase } from '@/usecases/domain/authenticate/AuthenticatorUseCase'
import { Authenticator } from '@/entities/domain/models/Authenticator'

const authenticatorRepository: AuthenticatorRepository = new InMemoryAuthenticator()

const makeSUT = (): AuthenticateUseCase => {
  const authenticatorUseCase: AuthenticateUseCase = new AuthenticateUseCase(authenticatorRepository)
  return authenticatorUseCase
}

describe('AuthenticatorUseCase', () => {
  beforeAll(async () => {
    await authenticatorRepository.register(new Authenticator(undefined, 'any_email', 'any_password'))
  })
  test('Deve realizar autenticação', async () => {
    const authenticateUseCase = makeSUT()
    const authenticator = new Authenticator(undefined, 'any_email', 'any_password')
    const result = await authenticateUseCase.authenticate(authenticator)
    expect(result).toContain('any_email')
  })
})
