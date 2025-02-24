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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const BdInMemory_config_1 = require("./db/BdInMemory.config");
const task_controller_1 = require("./controllers/task.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const DEFAULT_PATH_API_TASK = '/api/tasks';
const db = new BdInMemory_config_1.BdInMemoryConfig();
const taskController = new task_controller_1.TaskController();
function middlewares() {
    app.use(express_1.default.json());
}
function initBd() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Inicializando base de datos');
        yield db.init();
    });
}
middlewares();
app.get(DEFAULT_PATH_API_TASK, (req, res) => {
    res.send('Hello World');
});
app.post(DEFAULT_PATH_API_TASK + "/V1/createTask", (req, res) => {
    return taskController.createTask(req, res);
});
app.get(DEFAULT_PATH_API_TASK + "/V1/getAllTask", (req, res) => {
    return taskController.getAllTask(req, res);
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield initBd();
    console.clear();
    console.log(`[server]: servidor iniciado en http://localhost:${port}`);
}));
