import {TaskModel} from "../models/task.model";
import {ITaskModel} from "../models/interfaces/ITaskModel";

export class TaskService {
    public async createTask(newTask: any): Promise<any> {
        console.log("createTask::newTask", newTask);
        return TaskModel.create(newTask);
    }

    public async getAllTask(): Promise<ITaskModel[]> {
        return TaskModel.findAll();
    }

    public async getTaskById(id: number): Promise<TaskModel | null> {
        return TaskModel.findByPk(id);
    }

    public async getTaskByTitle(title: string): Promise<TaskModel | null> {
        return TaskModel.findOne({ where: { title } });
    }

    public async updateTask(id: number, task: any): Promise<any> {
        return TaskModel.update(task, { where: { id } });
    }

    public async deleteTask(id: number): Promise<any> {
        return TaskModel.destroy({ where: { id } });
    }

}