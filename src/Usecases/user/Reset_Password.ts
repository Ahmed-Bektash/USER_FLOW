import UserEntity from "../../Entities/UserEntity";
import { DataElement_Types, ErrorResponse, ErrorTypes, userInfo, verifyType,returnObject } from "../../types";
// import crypto, { BinaryLike } from "crypto";
import { DB_UpdateElement, DB_verifyElement } from "../../DB_Manager/DB_Manager";
const bcrypt = require('bcrypt');

export default async function Reset_Password(userinfo:userInfo){

try {
    const user= new UserEntity(userinfo);

    // const checkedToken = crypto
    // .createHash("sha256")
    // .update(userinfo.resetPasswordToken as BinaryLike)
    // .digest("hex");

   

    const  userObject:userInfo={
        resetPasswordToken: userinfo.resetPasswordToken,
        email: user.getEmail()
       }

       const verifiedUser =  await DB_verifyElement(userObject,DataElement_Types.User,verifyType.Token);
    
     if(!verifiedUser){
        throw new ErrorResponse(`DB error: User not found`,ErrorTypes.RESOURCE_NOT_FOUND);
     }

     const salt=10;
     const HashedPasswords = await bcrypt.hashSync(user.getPassword(), salt);

     const ObjToBeUpdated={
        password: HashedPasswords,
        reset_password_token:undefined,
        reset_password_expire_time:undefined
       }

       await DB_UpdateElement(verifiedUser.id!,DataElement_Types.User,ObjToBeUpdated);

       const returnObject:returnObject={
        success:true,
        message: `updated password for ${user.getEmail()}`
    }

    return returnObject;
    
} catch (error) {
    throw new ErrorResponse(`unable to reset Password due to: ${error.message}`,ErrorTypes.INTERNAL_SERVER_ERROR);
}

}