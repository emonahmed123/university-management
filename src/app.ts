import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
app.use(cors())
import userRoute from './modules/users/user.route'

//parser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/user', userRoute)

//Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Succesfully')
})

export default app
