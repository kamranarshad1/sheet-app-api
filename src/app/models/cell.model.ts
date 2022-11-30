import { Table, Column as Col, Model, AllowNull, ForeignKey, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript'
import { InferAttributes, InferCreationAttributes } from 'sequelize/types'
import Column from './column.model'

interface Cell {
  id: number
  value: string
  row: number
  columnId: number
  createdAt?: Date
  updatedAt?: Date
}

@Table({
  timestamps: true,
  modelName: 'Cell',
  tableName: 'cells',
})
class Cell extends Model<InferAttributes<Cell>, InferCreationAttributes<Cell>> {
  @AllowNull(false)
  @Col({
    type: DataType.STRING,
    allowNull: false,
  })
  value!: string

  @AllowNull(false)
  @Col
  row!: number

  @AllowNull(false)
  @ForeignKey(() => Column)
  @Col
  columnId!: number

  @CreatedAt
  createdAt?: Date

  @UpdatedAt
  updatedAt?: Date
}

export default Cell

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Cell extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       const { Column } = models

//       Cell.belongsTo(Column, {
//         foreignKey: 'columnId',
//       })
//     }
//   }
//   Cell.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     value: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     row: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//       validate: {
//         min: 0,
//       },
//     },
//     columnId: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//   }, {
//     sequelize,
//     modelName: 'Cell',
//     tableName: 'cells',
//   });
//   return Cell;
// };
