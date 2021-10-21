import { Router,Request, Response} from "express";
import { ErrorResponse, ErrorTypes } from "../types";
import productsController from "../Controllers/productsController";
import routeHandler from "../helpers/routeHandler";

const productsRouter = Router();


productsRouter.all('/',async(req:Request,res:Response,next)=>{ 

  try {
    switch(req.method){
      case'GET':
        await routeHandler(req,res,productsController.getProducts);
      break;
      case'POST':
        res.status(200).send("post request")
      break;
    }
  } catch (error) {
    next(new ErrorResponse(error.message,error.type))
  }
 
})

productsRouter.get('/:id',async(req:Request,res:Response,next)=>{ 
  try {
    await routeHandler(req,res,productsController.getProducts)
  } catch (error) {
    next(new ErrorResponse(error.message,error.type))
  }
})

//has to be at the end
 //TODO: replace elegentally
productsRouter.all('*',(req,res,next)=>{
  const path = req.url
  const method= req.method
  next(new ErrorResponse(`page not found on url ${path} for ${method}`,ErrorTypes.RESOURCE_NOT_FOUND))
  res.end();
})


  

 
  


 


export default productsRouter;