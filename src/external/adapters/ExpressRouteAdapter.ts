import { Controller } from '@/adapters/http/contracts/Controller'
import { Request, Response } from 'express'

export const routeAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const { method, hostname, ip, originalUrl, path, body, params, query, headers } = request
    const requestPayload = {
      ...body,
      ...params,
      ...query,
      ...headers,
      method,
      hostname,
      ip,
      originalUrl,
      path
    }

    const httpResponse = await controller.processRequest(requestPayload)

    response.status(httpResponse.statusCode).json(httpResponse)
  }
}
