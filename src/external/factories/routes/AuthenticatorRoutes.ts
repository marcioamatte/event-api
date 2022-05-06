import { routeAdapter } from '@/external/adapters/ExpressRouteAdapter'
import { Router } from 'express'
import { makeAuthenticatorController } from '../controllers/AuthenticatorControllerFactory'

const authenticatorRouter = Router()
const controller = routeAdapter(makeAuthenticatorController())

authenticatorRouter.post('/', controller)

export { authenticatorRouter }
