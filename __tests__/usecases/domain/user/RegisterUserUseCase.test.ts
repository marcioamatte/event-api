import { InMemoryAuthenticator } from './InMemoryAuthenticator'
import { InMemoryUser } from './InMemoryUser'
import { RegisterUserUseCase } from '@/usecases/domain/user/RegisterUserUseCase'

let inMemoryUser = new InMemoryUser()
let inMemoryAuthenticator = new InMemoryAuthenticator()

let sut = new RegisterUserUseCase(inMemoryUser, inMemoryAuthenticator)

describe('Registro de Usuários - UseCase', () => {
  afterEach(async () => {
    inMemoryUser = new InMemoryUser()
    inMemoryAuthenticator = new InMemoryAuthenticator()
    sut = new RegisterUserUseCase(inMemoryUser, inMemoryAuthenticator)
  })
  test('Deve apresentar um erro ao receber um usuário sem o nome', async () => {
    const request = { name: '', email: 'any_email', password: 'any_password' }
    const result = await sut.registerUser(request)
    expect(result.isLeft()).toBeTruthy()
  })

  test('Deve apresentar um erro ao receber um usuário sem o email', async () => {
    const request = { name: 'any_name', email: '', password: 'any_password' }
    const result = await sut.registerUser(request)
    expect(result.isLeft()).toBeTruthy()
  })

  test('Deve apresentar um erro ao receber um usuário sem a senha', async () => {
    const request = { name: 'any_name', email: 'any_email', password: '' }
    const result = await sut.registerUser(request)
    expect(result.isLeft()).toBeTruthy()
  })

  test('Deve retornar uma instância de Error ao tentar fazer um registro para um e-mail existente', async () => {
    const request = { name: 'any_name', email: 'any_email', password: 'any_password' }
    await sut.registerUser(request)
    const result = await sut.registerUser(request)
    expect(result.value).toBeInstanceOf(Error)
  })
})
