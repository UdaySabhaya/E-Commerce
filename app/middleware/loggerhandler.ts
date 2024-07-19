import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import {v4 as uuid4} from 'uuid';
import { RequestExtends } from "../interface/reqInterface";

export const requestLogger = (req:RequestExtends,res:Response,next:NextFunction)=>{
    const date= new Date();
    const uuid =uuid4();
    req.id = uuid;
    logger.info(
        `Request is received id ${uuid} received at ${date} Method: ${req.method}`
    );
    res.on('finish',()=>{
        logger.info(`Request is finished`)
    })
    next();
}