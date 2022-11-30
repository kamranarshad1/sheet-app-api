import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils'
import db from '../models/index.model'
import Sheet from '../models/sheet.model'
import Column from '../models/column.model'
import Cell from '../models/cell.model'

interface Row {
  [key: number]: Cell[]
}

interface SheetWithRows extends Sheet {
  rows?: Row
}

export const getSheet = async (req: Request, res: Response) => {
  try {
    const sheet: SheetWithRows | null = await Sheet.findByPk(req.params.id, {
      include: [{
        model: Column,
        as: 'columns',
      }],
      plain: true,
    })

    if (!sheet) return res.status(404).json({ error: 'sheet not found' })


    if (sheet.columns?.length) {
      const cells = (await db.query(`SELECT json_agg((cells.*)) as rows FROM cells WHERE "columnId" in (${sheet.columns.map((col) => col.id)}) group by row`, {
        model: Cell,
        mapToModel: true,
        raw: true,
      })) as unknown as Record<'rows', Cell[]>[]

      sheet.rows = cells.reduce((res: Record<number, Cell[]>, curr) => {
        res[curr.rows[0].row] = curr.rows
        return res
      }, {})
    }

    return res.status(200).json(sheet)
  } catch(e) {
    return res.status(500).json({ error: getErrorMessage(e) })
  }
}

export const createSheet = async (req: Request, res: Response) => {
  try {

    const sheet = await Sheet.create(req.body)

    if (!sheet) return res.status(404).json({ error: 'failed to save sheet' })

    return res.status(201).json(sheet)
  } catch(e) {
    return res.status(500).json({ error: getErrorMessage(e) })
  }
}
