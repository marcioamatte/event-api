import { Authenticator } from '../models/Authenticator'

type AuthenticatorRegistered = Authenticator | Error
export interface AuthenticatorRepository {
    register(authenticator:Authenticator): Promise<boolean>
    authenticate(authenticator:Authenticator): Promise<AuthenticatorRegistered>
}
