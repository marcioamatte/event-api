import { routeAdapter } from '@/external/adapters/ExpressRouteAdapter'
import { Router } from 'express'
import { makeRegisterUserController } from '../controllers/RegisterUserControllerFactory'

const userRouter = Router()

const registerUserController = routeAdapter(makeRegisterUserController())

userRouter.post('/', registerUserController)

export { userRouter }
