import { HttpResponse } from './HttpResponse'

export interface Controller<T = any> {
    processRequest: (request: T) => Promise<HttpResponse>
}
