"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
class TaskController {
    constructor() {
        this.taskService = new task_service_1.TaskService();
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = req.body;
            console.log("TaskController > createTask::newTask", newTask);
            const isCreateTask = yield this.taskService.createTask(newTask);
            if (isCreateTask) {
                return res.status(200).json({
                    message: 'Task created successfully',
                    data: isCreateTask
                });
            }
            else {
                return res.status(500).json({
                    message: 'Task not created'
                });
            }
        });
    }
    getAllTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTask = yield this.taskService.getAllTask();
            if (allTask) {
                return res.status(200).json({
                    message: 'All tasks',
                    data: allTask
                });
            }
            else {
                return res.status(500).json({
                    message: 'Tasks not found'
                });
            }
        });
    }
}
exports.TaskController = TaskController;
