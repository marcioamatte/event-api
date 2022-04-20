import './project/configurations/moduleAlias'
import express, { Application, Request, Response } from 'express'

const OK = 200
const PORT = 3000

const app:Application = express()

app.use(express.json())
app.get('/', (request: Request, response: Response) => {
  return response.status(OK).json({ health: 'checked' })
})

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))
