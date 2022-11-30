import { Router } from 'express'
import { getCell, upsertCell } from '../controllers/cells.controller'

const router = Router({ mergeParams: true })

router.get('/:id', getCell)
router.post('/', upsertCell)
router.put('/:id', upsertCell)

export default router
