import { NextFunction, Response } from "express";
import { prisma } from "../config/db";
import { CustomError } from "../interface/errorInterface";
import { RequestExtends } from "../interface/reqInterface";

export const isAdmin = async (req: RequestExtends, res: Response, next: NextFunction) => {
    try {
        const LoggerUser = req.user
        const admin = await prisma.user.findFirst({
            where: {
                id: LoggerUser.id
            }
        })

        if (!(admin?.role === 'Admin')) {
            throw new CustomError(400, "You Are Not Admin")
        }
        next();

    } catch (error) {
        next(error);
    }
}