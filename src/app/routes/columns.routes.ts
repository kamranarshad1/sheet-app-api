import { Router } from 'express'
import cellsRoutes from './cells.routes'
import { getColumn, upsertColumn } from '../controllers/columns.controller'

const router = Router({ mergeParams: true })

router.get('/:id', getColumn)
router.post('/', upsertColumn)
router.put('/:id', upsertColumn)

router.use('/:columnId/cells', cellsRoutes)

export default router
