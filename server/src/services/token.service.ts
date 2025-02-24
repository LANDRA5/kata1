import jwt from "jsonwebtoken";
import {IUserModel} from "../models/interfaces/IUserModel";

export class TokenService {
    private readonly secretHash;
    private readonly timeToExpire:any;

    constructor() {
        this.secretHash  = process.env.SECRET_HASH || 'secretHash';
        this.timeToExpire = process.env.TIME_TO_EXPIRE || '1h';

    }

    async validateToken(req: any, res: any) {
        try {
            const tokenHeader = req.headers.authorization;

            if (!tokenHeader) {
                return false;
            }
            jwt.verify(tokenHeader, this.secretHash);
            return true;
        } catch (e) {
            return false;
        }
    }

    async renovateToken(req: any, res: any) {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, this.secretHash) as IUserModel;
        const newToken = jwt.sign({ user: decoded.user, id: decoded.id }, this.secretHash, { expiresIn: this.timeToExpire });
        return {
            message: 'Token renovated',
            token: newToken
        };
    }

    async createToken(user: IUserModel) {
        const token = jwt.sign({ user: user.user, id: user.id }, this.secretHash, { expiresIn: this.timeToExpire });
        return {
            id: user.id,
            user: user.user,
            token: token
        }
    }
}