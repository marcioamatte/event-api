import { Router } from 'express'
import { userRouter } from './UserRoutes'

const mainRouter = Router()

mainRouter.use('/users', userRouter)

export { mainRouter }
