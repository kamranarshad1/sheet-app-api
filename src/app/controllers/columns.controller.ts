import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils'
import db from '../models/index.model'

const { Column, Cell } = db.models

export const getColumn = async (req: Request, res: Response) => {
  try {
    const column = await Column.findByPk(req.params.id, { include: Cell })

    if (!column) return res.status(404).json({ error: 'column not found' })

    return res.status(200).json(column)
  } catch(e) {
    return res.status(500).json({ error: getErrorMessage(e) })
  }
}

export const upsertColumn = async (req: Request, res: Response) => {
  try {
    const { body: { name, type }, params: { sheetId, id } } = req

    if (!name || !type || !sheetId) return res.status(400).json({ error: 'invalid request body' })

    const [column] = await Column.upsert({
      id,
      name,
      type,
      sheetId,
    })

    if (!column) return res.status(404).json({ error: 'column not found' })

    return res.status(200).json(column)
  } catch(e) {
    return res.status(500).json({ error: getErrorMessage(e) })
  }
}
