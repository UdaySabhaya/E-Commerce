import { validationResult } from "express-validator";
import { Request } from "express"
import { CustomError } from "../interface/errorInterface";

export const errorCheck = async (request: Request) => {
    let message = '';
    const haserror = validationResult(request);
    if (!haserror.isEmpty()) {
        haserror.array().forEach(element => {
            message += " " +element.msg
        });
    }
    
    if (message.trim()) {
        throw new CustomError(400, message)
    }
}
