import { Request, Response } from "express";
import { ErrorResponse, ErrorTypes } from "../types";

export default function Authenticate(req:Request,res:Response,next:Function){


    if(!req.session || !(req.session as any).user_ID || !(req.session as any).user_Type){
        next(new ErrorResponse("user not authenticated",ErrorTypes.NOT_AUTHENTICATED));
        console.log('res.locals:',res.locals) //just to have used it, alternatively remove the ts config rule for using function inputs.
    }else{ 
        next();
    }
}