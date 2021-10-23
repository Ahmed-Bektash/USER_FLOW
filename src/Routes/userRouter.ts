import { Router,Request, Response} from "express";
import routeHandler from "../helpers/routeHandler";
import userController from '../Controllers/UserController';
import { ErrorResponse } from "../types";
import Authenticate from "../Middleware/Authentication";



const userRouter = Router();

userRouter.post('/register',async(req: Request,res:Response,next)=>{
 try {
   await routeHandler(req,res,userController.registerUser);
  
 } catch (error) {
  next(new ErrorResponse(error.message,error.type))
 }
});

userRouter.post('/login',async(req: Request,res:Response,next)=>{
  try {
    
  await routeHandler(req,res,userController.LoginUser); 
} catch (error) {
  next(new ErrorResponse(error.message,error.type));
}
});

userRouter.post('/logout',Authenticate,async(req: Request,res:Response,next)=>{
  try {
  await routeHandler(req,res,userController.LogoutUser); 
} catch (error) {
  next(new ErrorResponse(error.message,error.type));
}
});

userRouter.post('/forgotpassword',Authenticate,async(req: Request,res:Response,next)=>{
  try {
  await routeHandler(req,res,userController.forgotPassword); 
} catch (error) {
  next(new ErrorResponse(error.message,error.type));
}
});

userRouter.put('/passwordreset/:resetToken',Authenticate,async(req: Request,res:Response,next)=>{
  try {
  await routeHandler(req,res,userController.resetPassword); 
} catch (error) {
  next(new ErrorResponse(error.message,error.type));
}
}); 

userRouter.delete('/',Authenticate,async(req: Request,res:Response,next)=>{

  try {
    await routeHandler(req,res,userController.deleteUser); 
  } catch (error) {
    next(new ErrorResponse(error.message,error.type));
  }

});





userRouter.get('/dashboard',Authenticate,async(req: Request,res:Response)=>{
  // console.log(req.headers) 
  console.log(req.session)
  res.send('Dashboard!')
});




export default userRouter; 