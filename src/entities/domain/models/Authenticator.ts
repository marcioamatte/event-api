export class Authenticator {
  id?:string
  email: string
  password: string

  constructor (id:string, email:string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }
}
