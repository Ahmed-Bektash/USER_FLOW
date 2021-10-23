
import {Controller, ErrorResponse, RequestInterface, ResponseInterface, userInfo} from '../types'
import AddUser from '../Usecases/user/Adduser';
import login from '../Usecases/user/LogIn';
import logout from '../Usecases/user/Logout';
import Forgot_Password from '../Usecases/user/Forgot_Password';
import Reset_Password from '../Usecases/user/Reset_Password';

class userController{

     registerUser:Controller = async (Request:RequestInterface):Promise<ResponseInterface>=>{
        
        let response:ResponseInterface={
            status:200 //default to be overwritten
        };

        const userInfo:userInfo={
            firstName:Request.body.firstName,
            lastName: Request.body.lastName,
            phone: Request.body.phoneNumber,
            email:Request.body.email,
            paid: Request.body.isPaidAccount,
            password: Request.body.password,
            type: Request.body.type,
            updateDate: new Date()
          }

        try {
    
            const AddedUser =  await AddUser(userInfo);
            response.body=AddedUser;
            response.session={
                uid:AddedUser!.id,
                role: AddedUser!.type
            }
            return response;         
            
        } catch (error) {
            throw new ErrorResponse(`Can't register user due to: ${error.message}`,error.type);
        }
    
    }

    

    LoginUser:Controller = async (Request:RequestInterface):Promise<ResponseInterface>=>{
        
        let response:ResponseInterface={
            status:200 //default to be overwritten
        };

        const userInfo:userInfo={
            firstName:Request.body.firstName,
            lastName: Request.body.lastName,
            phone: Request.body.phoneNumber,
            email:Request.body.email,
            paid: Request.body.isPaidAccount,
            password: Request.body.password,
            type: Request.body.type,
            updateDate: new Date()
          }

        try {
    
            let LoggedInUser=  await login(userInfo);
            response.body=LoggedInUser
            response.session={
                uid:LoggedInUser!.id,
                role: LoggedInUser!.type
            }
            
            return response;         
            
        } catch (error) {
            throw new ErrorResponse(`Can't login user due to: ${error.message}`,error.type);
        }
    
    }

    LogoutUser:Controller = async (Request:RequestInterface):Promise<ResponseInterface>=>{

        let response:ResponseInterface={
            status:200 //default to be overwritten
        };

        const userInfo:userInfo={
            id:Request.body.id
          }

        try {
    
            let isLoggedOut=  await logout(userInfo);
         
            response.session={
                loggedout:isLoggedOut
            }
            response.body={
                success:true,
                message: 'you have logged out'
            }
            
            return response;         
            
        } catch (error) {
            throw new ErrorResponse(`Can't logout user due to: ${error.message}`,error.type);
        }
    }

    forgotPassword:Controller = async (Request:RequestInterface):Promise<ResponseInterface>=>{
        
        let response:ResponseInterface={
            status:200 //default to be overwritten
        };

        const userInfo:userInfo={
            email:Request.body.email,
            type: Request.body.type,
            updateDate: new Date()
          }

        try {
    
            let ForgetPasswordResponse=  await Forgot_Password(userInfo);
            response.body=ForgetPasswordResponse
            
            return response;         
            
        } catch (error) {
            throw new ErrorResponse(`Can't forget password due to: ${error.message}`,error.type);
        }
    
        
    }

    resetPassword:Controller = async (Request:RequestInterface):Promise<ResponseInterface>=>{
        
        let response:ResponseInterface={
            status:200 //default to be overwritten
        };

        //flow will change after UI is made, first we verify token then send page to reset password then reset password
        const userInfo:userInfo={
            email:Request.body.email,
            password:Request.body.password,
            resetPasswordToken:Request.params!.resetToken,
            updateDate: new Date()
          }
          try {
    
            let passwordResetResponse=  await Reset_Password(userInfo);
            response.body=passwordResetResponse
            
            return response;         
            
        } catch (error) {
            throw new ErrorResponse(`Can't reset password due to: ${error.message}`,error.type);
        }
    }
    
	deleteUser:Controller = async (Request:RequestInterface):Promise<ResponseInterface>=>{

        let response:ResponseInterface={
            status:200 //default to be overwritten
        };

        const toBeDeleted:userInfo={
            id:Request.body.id 
          } //not params for secuirty not to have the ID displayed on the URL

         const RequestingUser:userInfo={
             id: (Request.session as any).uid,
             type:(Request.session as any).role
         }
             console.log('deleter:',(Request.session as any).uid)
            console.log('type:',(Request.session as any).role)
            console.log('deleting:',(Request.body.id))
        try {
            //by now the user should be already authenticated
            const type:DataElement_Types=DataElement_Types.User
            await Delete(toBeDeleted,RequestingUser,type);
            response.body={
                success:true,
                message: `user with id: ${toBeDeleted.id} has been deleted`
            }
            
            return response;         
            
        } catch (error) {
            throw new ErrorResponse(`Can't delete user due to: ${error.message}`,error.type);
        }
    } 
    
}

export default new userController; 