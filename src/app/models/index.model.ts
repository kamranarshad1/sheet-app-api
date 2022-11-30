import { Sequelize } from 'sequelize-typescript'
import Cell from './cell.model';
import Column from './column.model';
import Sheet from './sheet.model';
import config from '../../config/dbConfig'

const env = (process.env.NODE_ENV || 'development') as keyof typeof config;

const sequelize = new Sequelize({ ...config[env], models: [Sheet, Column, Cell] });

export default sequelize
