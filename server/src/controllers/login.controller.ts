import jwt from 'jsonwebtoken';
import {LoginService} from "../services/login.service";
import {TokenService} from "../services/token.service";

export class LoginController {

    private readonly secretHash;

    private loginService: LoginService;
    private tokenService: TokenService;

    constructor() {
        this.loginService = new LoginService();
        this.tokenService = new TokenService();
        this.secretHash  = process.env.SECRET_HASH || 'secretHash';
    }

    async registerUser(req: any, res: any) {
        const newUser = req.body;
        const isRegisterUser = await this.loginService.createUser(newUser);
        if (isRegisterUser) {
            return res.status(200).json({
                message: 'User registered successfully',
                data: isRegisterUser.id
            });
        } else {
            return res.status(500).json({
                message: 'User not registered'
            });
        }
    }

    async loginUser(req: any, res: any) {
        try {
            const userRequest = req.body;
            const userLogin = await this.loginService.loginUser(userRequest);

            if (!userLogin || userLogin.password !== userRequest.password) {
                return res.status(401).json({
                    message: 'User or password incorrect'
                });
            }

            const token = await this.tokenService.createToken(userRequest);
            return res.status(200).json(token);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(401).json({
                message: 'Error al iniciar sesión'
            });
        }
    }

    async validateToken(req: any, res: any) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: 'Token not found'
                });
            }

            jwt.verify(token, this.secretHash, (err: any, decoded: any) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Token invalid'
                    });
                }
                return res.status(200).json({
                    message: 'Token valid',
                    data: {
                        user: decoded.user,
                        id: decoded.id
                    }
                });
            });
        } catch (e) {
            return res.status(401).json({
                message: 'Error validating token'
            });
        }
    }

    async renovateToken(req: any, res: any) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    message: 'Token not found'
                });
            }
            const renovateToken = await this.tokenService.renovateToken(req, res);
            return res.status(200).json({
                message: 'Token renovated',
                token: renovateToken.token
            });

        } catch (e) {
            return res.status(401).json({
                message: 'Error renovating token'
            });
        }
    }
}