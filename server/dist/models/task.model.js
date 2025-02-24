"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const sequelize_1 = require("sequelize");
class TaskModel extends sequelize_1.Model {
    static initialize(sequelize) {
        TaskModel.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'Task',
        });
    }
}
exports.TaskModel = TaskModel;
