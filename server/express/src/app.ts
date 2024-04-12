import express, { type Express } from "express"

import clientsRouter from './routes/clients.route.ts'

const app: Express = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/clients', clientsRouter)

export default app
