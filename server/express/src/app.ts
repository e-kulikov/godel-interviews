import express, { type Express } from 'express'
import cors from 'cors'

import { errorHandler } from './middlewares/error.middleware.ts'

import clientsRouter from './routes/clients.route.ts'
import assetsRouter from './routes/assets.route.ts'

const app: Express = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/clients', clientsRouter)
app.use('/assets', assetsRouter)

app.use(errorHandler)

export default app
