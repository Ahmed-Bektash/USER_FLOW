import { Request, Response } from "express";
import {ErrorResponse,ErrorTypes} from "../types";

export function ERRH(err:ErrorResponse, req:Request, res:Response, next:Function){
  let error = { ...err };
  let errorCode;

  error.message = err.message;

  console.log(next.name);
  console.log('request body:',req.body)

//add error handling logic here
switch (err.type) {
  case ErrorTypes.BAD_REQ:
    errorCode=400
    break;

  case ErrorTypes.NOT_AUTHENTICATED:
    errorCode=401;
    break;  

  case ErrorTypes.UNAUTHORISED:
    errorCode=403;
    break; 

  case ErrorTypes.RESOURCE_NOT_FOUND:
    errorCode=404;
    break; 

  case ErrorTypes.INTERNAL_SERVER_ERROR:
  case ErrorTypes.DB_ERROR:
    errorCode=500;
  break; 

  case ErrorTypes.WRONG_DATA:
  case ErrorTypes.USER_EXISTS:
    errorCode=403;
  break;
  
  default:
    errorCode=500;
    break;
}
 
  console.log(error.message);

  res.status(errorCode).json({
    success: false,
    error: error.message || "Server Error",
  });
}




