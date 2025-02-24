import { Sequelize, DataTypes, Model } from 'sequelize';
import {IUserModel} from "./interfaces/IUserModel";

export class UserLoginModel extends Model implements IUserModel {
  public id!: number;
  public user!: string;
  public password!: string;

  public static initialize(sequelize: Sequelize): void {
    UserLoginModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'UserLogin',
      }
    );
  }

}