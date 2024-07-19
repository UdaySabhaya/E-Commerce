import { Response } from "express";

export const responseOfAllService = async(res:Response,reqId:string,message:string,result:any)=>{
    console.log(reqId);
    
    res.send({
        reqId :reqId,
        message:message,
        errorMessage:"",
        result:result
    })

}