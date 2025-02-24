import { Sequelize, DataTypes, Model } from 'sequelize';
import {ITaskModel} from "./interfaces/ITaskModel";

export class TaskModel extends Model implements ITaskModel {
  public id!: number;
  public name!: string;
  public description!: string;

  public static initialize(sequelize: Sequelize): void {
      TaskModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Task',
      }
    );
  }
}