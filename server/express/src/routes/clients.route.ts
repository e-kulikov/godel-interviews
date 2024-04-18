import { Router } from 'express'
import * as clients from '../controllers/clients.controller.ts'

const router: Router = Router()

router.get('/', clients.getAllClients)

router.get('/:id', clients.getClientById)

export default router
