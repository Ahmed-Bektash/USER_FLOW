import UserEntity from "../../Entities/UserEntity";
import { DB_UpdateElement, DB_verifyElement } from "../../DB_Manager/DB_Manager";
import { DataElement_Types, ErrorResponse, ErrorTypes, returnObject, userInfo, verifyType } from "../../types";
import sendEmail from "../../helpers/sendEmail";


export default async function Forgot_Password(userinfo:userInfo){
    
    try {
      const user= new UserEntity(userinfo);

    const  userObject:userInfo={
       email: user.getEmail(),
      }
        
      const verifiedUser =  await DB_verifyElement(userObject,DataElement_Types.User,verifyType.Email);
    
     if(!verifiedUser){
        throw new ErrorResponse(`DB error: User not found`,ErrorTypes.RESOURCE_NOT_FOUND);
     }

     let resetToken:String|undefined= user.getPassResetToken(); 
     let tokenValidTime:number|undefined= Date.now() + 10 * (60 * 1000); // Ten Minutes
     const resetUrl = `http://localhost:5000/api/v1/users/passwordreset/${resetToken}`; //update when deploying properly
     // HTML Message
    const message = `
                        <h1>You have requested a password reset</h1>
                        <p>Please click on the following link:</p>
                        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                    `;


     const ObjToBeUpdated= {
      reset_password_token:resetToken,
      reset_password_expire_time:tokenValidTime
     }

     
    await DB_UpdateElement(verifiedUser.id!,DataElement_Types.User,ObjToBeUpdated);

    try {
      const returnFromEmail= sendEmail({
        EmailTo: user.getEmail()!,
        subject: "Password Reset Request",
        text: message,
      });

      const returnObject:returnObject={
          success:true,
          message: `email sent to ${user.getEmail()}`,
          body:returnFromEmail
      }
      return returnObject;


    } catch (err) { //separate catch because we want to keep the verified user here

        resetToken = undefined;
        tokenValidTime = undefined;

      const ObjToBeUpdated= {
        reset_password_token:resetToken,
        reset_password_expire_time:tokenValidTime
     }

    await DB_UpdateElement(verifiedUser.id!,DataElement_Types.User,ObjToBeUpdated);

    throw new ErrorResponse(`Email could not be sent because ${err.message}`,err.type);
    }

    } catch (error) {
    
      throw new ErrorResponse(`unable to forget Password: ${error.message}`,error.type);
  

    } 
}


