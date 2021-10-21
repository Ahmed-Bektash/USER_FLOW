import adaptRequest from "./adaptrequest";
import {Request, Response} from "express";
import { Controller, ErrorResponse, ErrorTypes, ResponseInterface } from "../types";

async function routeHandler(req:Request,res:Response,controller:Controller){
 
  const httpRequest =  adaptRequest(req);
  let  httpResponse:ResponseInterface={
    status:200
  };
  //console.log('the session ID:',httpRequest.session)
  try {
      httpResponse =  await controller(httpRequest) ; 
      
      if(httpResponse.headers){
        res.set(httpResponse.headers);
    }
   
    if(httpResponse.session){

      if(httpResponse.session.loggedout){
        req.session.destroy((error)=>{
          if(error){
            throw new ErrorResponse(`${error.message}`,ErrorTypes.INTERNAL_SERVER_ERROR)
          }
         
          console.log("successful logout")
          
          // res.redirect('/login') // after you implement front end
        })
      }else{
        (req.session as any).user_ID = httpResponse.session.uid;
        (req.session as any).user_Type = httpResponse.session.role;

      }
      
    }
        res.type('application/json');
        res.status(httpResponse.status).send(httpResponse.body)
    
  } catch (error) {
    throw new ErrorResponse(`${error.message}`,error.type)
  }  
  
    
  }

  export default routeHandler;