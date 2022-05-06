import { HttpReponseError } from '@/adapters/errors/HttpResponseError'
import { Controller } from '@/adapters/http/contracts/Controller'
import { badRequest, ok, HttpResponse } from '@/adapters/http/contracts/HttpResponse'
import { AuthenticateUseCase } from '@/usecases/domain/authenticate/AuthenticatorUseCase'

type AuthRequest = {
    email: string
    password: string
}

export class AuthenticatorController implements Controller<AuthRequest> {
  // eslint-disable-next-line no-useless-constructor
  constructor (readonly authenticatorUseCase: AuthenticateUseCase) {}
  async processRequest (request: AuthRequest): Promise<HttpResponse> {
    console.log(request)
    const { email, password } = request
    if (!email || !password) {
      return badRequest(new HttpReponseError('Parâmetros obrigatórios faltado'))
    }
    const authenticated = await this.authenticatorUseCase.authenticate({ email, password })
    if (authenticated && authenticated.isLeft()) {
      return badRequest(authenticated.value)
    }
    return ok(authenticated.value)
  }
}
