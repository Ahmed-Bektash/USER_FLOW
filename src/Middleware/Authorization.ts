import { Request, Response } from "express";
import { ErrorResponse, ErrorTypes, Page_type, UserRole } from "../types";

export default function Authorize(role?:UserRole, Access?:Page_type){ 
    
    // you can also create a permissions folder with specific CRUD permissions based on access types and user IDs but in this architecture it will be handled in useCases
    
    return(req:Request,res:Response,next:Function)=>{

        if(
            (((req.session as any).user_Type=== UserRole.ADMIN) || //admin has total access
            ((req.session as any).user_Type===role)|| //for premium pages
            ((Access===Page_type.PRIVATE)&&((req.session as any).user_ID=== req.body.id))) //for private pages

            ){
                
                next();
        }
        else{ 
            next(new ErrorResponse("user not Authorized to access resource",ErrorTypes.UNAUTHORISED));
                console.log('res.locals:',res.locals) //just to have used it, alternatively remove the ts config rule for using function inputs.
        }
    }
}
