import { Table, Column as Col, Model, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'
import db from './index.model'
import Column from './column.model'

interface Sheet {
  id: number
  name?: string
  columns?: Column[]
  createdAt?: Date
  updatedAt?: Date
}

@Table({
  timestamps: true,
  modelName: 'Sheet',
  tableName: 'sheets',
})
class Sheet extends Model<InferAttributes<Sheet>, InferCreationAttributes<Sheet>> {
  @Col
  name?: string;

  @HasMany(() => Column)
  columns?: Column[]

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}

export default Sheet

// module.exports = (sequelize, DataTypes) => {
//   class Sheet extkends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       const { Column } = models

//       Sheet.hasMany(Column, {
//         foreignKey: 'sheetId',
//         as: 'columns',
//         onDelete: 'CASCADE',
//       })
//     }
//   }
//   Sheet.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Sheet',
//     tableName: 'sheets',
//   });
//   return Sheet;
// };
