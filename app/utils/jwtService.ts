import jwt from "jsonwebtoken"
import { userInterface } from "../interface/userInterface";

const secret = '${PROCESS.ENV.SECRET}';

const signupToken = (data:userInterface)=>{
    return jwt.sign(data,secret,{
        expiresIn:'5h'
    })
}

const verifyToken  = (token:string)=>{
    return jwt.verify(token,secret)
}

export const jwtService = {
    signupToken,verifyToken
}
