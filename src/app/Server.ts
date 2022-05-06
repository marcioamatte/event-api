import cors from 'cors'
import helmet from 'helmet'
import express, { Application } from 'express'
import { mainRouter } from '@/external/factories/routes'

const app:Application = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/v1', mainRouter)

export { app }
