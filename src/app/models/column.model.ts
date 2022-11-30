import { Table, Column as Col, Model, AllowNull, ForeignKey, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import Sheet from './sheet.model';
import Cell from './cell.model';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';

enum ColumnType {
  TEXT = 'text',
  NUMBER = 'number',
}

interface Column {
  id: number
  name: string
  type: ColumnType
  sheetId: number
  cells?: Cell[]
  createdAt?: Date
  updatedAt?: Date
}

@Table({
  timestamps: true,
  modelName: 'Column',
  tableName: 'columns',
})
class Column extends Model<InferAttributes<Column>, InferCreationAttributes<Column>> {
  @AllowNull(false)
  @Col
  name!: string

  @AllowNull(false)
  @Col
  type!: ColumnType

  @AllowNull(false)
  @ForeignKey(() => Sheet)
  @Col
  sheetId!: number

  @HasMany(() => Cell)
  cells?: Cell[]

  @CreatedAt
  createdAt?: Date

  @UpdatedAt
  updatedAt?: Date
}

export default Column

// module.exports = (sequelize, DataTypes) => {
//   class Column extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here

//       const { Sheet, Cell } = models

//       Column.belongsTo(Sheet, {
//         foreignKey: 'sheetId',
//         as: 'sheet',
//       })

//       Column.hasMany(Cell, {
//         foreignKey: 'columnId',
//         onDelete: 'CASCADE',
//       })
//     }
//   }
//   Column.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [2, 100],
//         notNull: true,
//         notEmpty: true,
//       },
//     },
//     type: {
//       type: DataTypes.ENUM(Object.values(ColumnType)),
//       allowNull: false,
//       validate: {
//         isIn: [Object.values(ColumnType)],
//       },
//     },
//     sheetId: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//   }, {
//     sequelize,
//     modelName: 'Column',
//     tableName: 'columns',
//   });
//   return Column;
// };
