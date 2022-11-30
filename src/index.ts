import 'dotenv/config'
import express, { Application } from 'express'
import cors from 'cors'
import routes from './app/routes/index.routes'

const app: Application = express()

const PORT = process.env.SERVER_PORT || 8080

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
