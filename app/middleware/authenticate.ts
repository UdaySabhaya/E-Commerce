import { NextFunction, Response } from "express"
import { RequestExtends } from "../interface/reqInterface"
import { CustomError } from "../interface/errorInterface";
import { jwtService } from "../utils/jwtService";

export const isAuthenticate = (req: RequestExtends, res: Response, next: NextFunction) => {
        try {
                const token = req?.headers?.authorization?.split(' ')[1];
                if (!token) {
                        throw new CustomError(401, "Unauthorized");
                }
                const verifyToken: any = jwtService.verifyToken(token);
                if (!verifyToken) {
                        throw new CustomError(400, 'Invalid token');
                }
                req.user = verifyToken;
                next();
        } catch (error) {
                next(error);
        }
}