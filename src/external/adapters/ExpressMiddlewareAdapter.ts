
import { Middleware } from '@/adapters/http/contracts/Middleware'
import { NextFunction, Request, Response } from 'express'

export const middlewareAdapter = (middleware: Middleware) => {
  const OK = 200
  return async (request: Request, response: Response, next: NextFunction) => {
    const { body } = request
    const requestPayload = {
      ...(request.headers || {})
    }

    const httpResponse = await middleware.processRequest(requestPayload, body)
    if (!httpResponse) return response.status(OK).send()
    if (httpResponse.statusCode === OK) {
      Object.assign(request, httpResponse.body)
      return next()
    } else {
      return response.status(httpResponse.statusCode).json(httpResponse)
    }
  }
}
