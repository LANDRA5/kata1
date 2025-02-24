import { Router, Request, Response } from 'express';
import { LoginController } from '../controllers/login.controller';

const router = Router();
const loginController = new LoginController();

router.post('/V1/register', (req: Request, res: Response) => {
    return loginController.registerUser(req, res);
});

router.post('/V1/ingress', (req: Request, res: Response) => {
    return loginController.loginUser(req, res);
});

router.post('/V1/validateToken', (req: Request, res: Response) => {
    return loginController.validateToken(req, res);
});

router.post('/V1/renovateToken', (req: Request, res: Response) => {
    return loginController.renovateToken(req, res);
});

export default router;