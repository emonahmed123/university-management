import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()
app.use(cors())
import userRoute from './modules/users/user.route'
import globalErrorHander from './middlewares/gobalerrorhandeler'

//parser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes

app.use('/api/v1/user', userRoute)

//Testing
// app.get('/', async (req: Request, res: Response) => {
//   throw new ApiError(400, ' get the error')
// })

app.use(globalErrorHander)

export default app
