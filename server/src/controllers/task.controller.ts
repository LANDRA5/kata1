import {TaskService} from "../services/task.service";

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    public async createTask(req: any, res: any): Promise<any> {
        const newTask = req.body;
        console.log("TaskController > createTask::newTask", newTask);
        const isCreateTask = await this.taskService.createTask(newTask);
        if (isCreateTask) {
            return res.status(200).json({
                message: 'Task created successfully',
                data: isCreateTask
            });
        } else {
            return res.status(500).json({
                message: 'Task not created'
            });
        }
    }

    public async getAllTask(req: any, res: any): Promise<any> {
        const allTask = await this.taskService.getAllTask();
        if (allTask) {
            return res.status(200).json({
                message: 'All tasks',
                data: allTask
            });
        } else {
            return res.status(500).json({
                message: 'Tasks not found'
            });
        }
    }

    public async updateTask(req: any, res: any): Promise<any> {
        const task = req.body;
        const id = task.id;
        const isUpdateTask = await this.taskService.updateTask(id, task);
        if (isUpdateTask) {
            return res.status(200).json({
                message: 'Task updated successfully',
                data: isUpdateTask
            });
        } else {
            return res.status(500).json({
                message: 'Task not updated'
            });
        }
    }

    public async deleteTask(req: any, res: any): Promise<any> {
        const id: any = req.query.id;
        const isDeleteTask = await this.taskService.deleteTask(id);
        if (isDeleteTask) {
            return res.status(200).json({
                message: 'Task deleted successfully',
                data: isDeleteTask
            });
        } else {
            return res.status(500).json({
                message: 'Task not deleted'
            });
        }
    }
}