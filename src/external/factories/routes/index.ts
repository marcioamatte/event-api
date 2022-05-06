import { Router } from 'express'
import { authenticatorRouter } from './AuthenticatorRoutes'
import { userRouter } from './UserRoutes'

const mainRouter = Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/auth', authenticatorRouter)

export { mainRouter }
