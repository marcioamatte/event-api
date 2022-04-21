import './project/configurations/moduleAlias'
import cors from 'cors'
import helmet from 'helmet'
import express, { Application } from 'express'
import { mainRouter } from './external/factories/routes'

const PORT = 3000

const app:Application = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/v1', mainRouter)

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))
