export class HttpReponseError extends Error {
  errorMessage: string
  timestamp: Date
  constructor (message: any) {
    super(message)
    this.errorMessage = message
    this.timestamp = new Date()
    this.name = 'HttpResponseError'
  }
}
