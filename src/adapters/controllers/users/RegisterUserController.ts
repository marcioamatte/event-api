import { HttpReponseError } from '@/adapters/errors/HttpResponseError'
import { Controller } from '@/adapters/http/contracts/Controller'
import { badRequest, created, HttpResponse } from '@/adapters/http/contracts/HttpResponse'
import { RegisterUserUseCase } from '@/usecases/domain/user/RegisterUserUseCase'

type RegisterUserRequest = {
    name: string
    email: string
    password: string
}

export class RegisterUserController implements Controller<RegisterUserRequest> {
  protected registerUserUseCase: RegisterUserUseCase

  constructor (registerUserUseCase:RegisterUserUseCase) {
    this.registerUserUseCase = registerUserUseCase
  }

  async processRequest ({ name, email, password }: RegisterUserRequest): Promise<HttpResponse> {
    try {
      if (!name || !email || !password) return badRequest(new HttpReponseError('Parâmetros incorretos ou não informados'))
      const user = await this.registerUserUseCase.registerUser({ name, email, password })
      if (user.isLeft()) {
        return badRequest(new HttpReponseError(user.value.message))
      }
      return created(user.value)
    } catch (error) {
      return badRequest(new HttpReponseError(error.message))
    }
  }
}
