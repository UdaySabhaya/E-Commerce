import { NextFunction, Request, Response, response } from "express";
import { CustomError } from "../interface/errorInterface";
import { logger } from "../utils/logger";
import { RequestExtends } from "../interface/reqInterface";


export const customError=(
    err: CustomError,
    req: RequestExtends,
    res:Response,
    next:NextFunction
    )=>{
       
        const error = new CustomError(err.status,err.message);
        logger.error(`Error while request method: ${req.method}`)
        return res.status(error.status).json(
            {
                reqId:req.id,
                message:"",
                errorMessage:error.message,
                result:""
            }
        )
    }