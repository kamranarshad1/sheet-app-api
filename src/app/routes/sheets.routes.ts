import { Router } from 'express'
import columnsRoutes from './columns.routes'
import { getSheet, createSheet } from '../controllers/sheets.controller'

const router = Router()

router.get('/:id', getSheet)
router.post('/', createSheet)

router.use('/:sheetId/columns', columnsRoutes)

export default router
