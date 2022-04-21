import { Authenticator } from '../models/Authenticator'
import { User } from '../models/User'

export interface AuthenticatorRepository {
    register(authenticator:Authenticator): Promise<boolean>
    authenticate(authenticator:Authenticator): Promise<User>
}
