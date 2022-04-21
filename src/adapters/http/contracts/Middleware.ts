import { HttpResponse } from './HttpResponse'

export interface Middleware<T = any, U = any> {
    processRequest: (httpRequest: T, requestBody?: U) => Promise<HttpResponse>
}
