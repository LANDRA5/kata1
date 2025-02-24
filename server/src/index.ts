import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import {BdInMemoryConfig} from "./db/BdInMemory.config";
import loginRoutes from "./routes/login.routes";
import taskRoutes from "./routes/task.routes";
import cors from 'cors';

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;
const DEFAULT_PATH_API_TASK = '/api/tasks';
const DEFAULT_PATH_API_LOGIN = '/api/login';
const db = new BdInMemoryConfig();

function middlewares(){
    app.use(express.json());
    app.use(cors());
}

async function initBd() {
    console.log('Inicializando base de datos');
    await db.init();
}


middlewares();

app.get(DEFAULT_PATH_API_TASK, (req: Request, res: Response) => {
    res.send('Health check');
});

app.use((_:Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(DEFAULT_PATH_API_TASK, taskRoutes);
app.use(DEFAULT_PATH_API_LOGIN, loginRoutes);

app.listen(port, async () => {
    await initBd();
    console.clear();
    console.log(`[server]: servidor iniciado en http://localhost:${port}`);
});