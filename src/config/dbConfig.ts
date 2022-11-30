import 'dotenv/config'
import { Dialect } from 'sequelize'

const basicConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect,
}

const development = basicConfig
const staging = basicConfig
const production = basicConfig

export default {
  development,
  staging,
  production,
}
