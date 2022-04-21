import { Either } from '@/project/logic/Either'
import { Authenticator } from '../models/Authenticator'

type AuthenticatorRegistered = Either<Error, Authenticator>
export interface AuthenticatorRepository {
    register(authenticator:Authenticator): Promise<boolean>
    authenticate(authenticator:Authenticator): Promise<AuthenticatorRegistered>
}
