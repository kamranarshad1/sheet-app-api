import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils'
import db from '../models/index.model'

const { Cell } = db.models

export const getCell = async (req: Request, res: Response) => {
  try {
    const cell = await Cell.findByPk(req.params.id)

    if (!cell) return res.status(404).json({ error: 'cell not found' })

    return res.status(200).json(cell)
  } catch(e) {
    return res.status(500).json({ error: getErrorMessage(e) })
  }
}

export const upsertCell = async (req: Request, res: Response) => {
  try {
    const { body: { row, value }, params: { columnId, id } } = req

    if (row === undefined || !value) return res.status(400).json({ error: 'invalid request body' })

    const [cell] = await Cell.upsert({
      id,
      row,
      columnId,
      value,
    })

    if (!cell) return res.status(404).json({ error: 'cell not found' })

    return res.status(200).json(cell)
  } catch(e) {
    return res.status(500).json({ error: getErrorMessage(e) })
  }
}
