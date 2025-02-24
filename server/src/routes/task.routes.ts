import { Router, Request, Response } from 'express';
import { TaskController } from '../controllers/task.controller';
import { TokenService } from '../services/token.service';

const router = Router();
const taskController = new TaskController();
const sessionService = new TokenService();

router.post('/V1/createTask', async (req: Request, res: Response) => {
    const isSecure = await sessionService.validateToken(req, res);
    if (!isSecure) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    return taskController.createTask(req, res);
});

router.get('/V1/getAllTask', async (req: Request, res: Response) => {
    const isSecure = await sessionService.validateToken(req, res);
    if (!isSecure) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    return taskController.getAllTask(req, res);
});

router.put('/V1/updateTask', async (req: Request, res: Response) => {
    const isSecure = await sessionService.validateToken(req, res);
    if (!isSecure) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    return taskController.updateTask(req, res);
});

router.delete('/V1/deleteTask/:id', async (req: Request, res: Response) => {
    const isSecure = await sessionService.validateToken(req, res);
    if (!isSecure) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    return taskController.deleteTask(req, res);
});

export default router;