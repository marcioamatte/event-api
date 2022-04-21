export interface HttpResponse {
    statusCode: number,
    body: any
}

export const ok = <T> (payload?: T): HttpResponse => ({
  statusCode: 200,
  body: payload
})

export const created = <T> (payload?: T): HttpResponse => ({
  statusCode: 201,
  body: payload
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const notAcceptable = (error: Error): HttpResponse => ({
  statusCode: 406,
  body: error
})

export const conflict = (error: Error): HttpResponse => ({
  statusCode: 409,
  body: error
})

export const tooManyRequests = (error: Error): HttpResponse => ({
  statusCode: 429,
  body: error
})

export const internalServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})
