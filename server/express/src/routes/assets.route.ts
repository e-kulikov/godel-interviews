import { Router } from 'express'
import * as assets from '../controllers/assets.controller.ts'

const router: Router = Router()

router.get('/:picture', assets.getPicture)

export default router
