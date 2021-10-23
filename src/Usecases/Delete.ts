import { DB_DeleteElement, DB_verifyElement } from "../DB_Manager/DB_Manager";
// import User from "../Entities/User";
import { DataElement_Types, ErrorResponse, ErrorTypes, userInfo, UserRole, verifyType } from "../types";


export default async function Delete(deletable:userInfo,deleter:userInfo, type:DataElement_Types){ // add OR ProductInfo or CommentInfo...etc
   
switch(type){
    case DataElement_Types.User:
        try {
            //   const user= User(userinfo);
              const verifiedUser =  await DB_verifyElement(deletable,DataElement_Types.User,verifyType.ID);

              if((deleter.id===verifiedUser!.id)||(deleter.type===UserRole.ADMIN)){
                const userinfo:userInfo={
                      id: verifiedUser?.id,
                      type:verifiedUser?.type
                  }
                await DB_DeleteElement(userinfo,DataElement_Types.User);
                return true
              }else{
                throw new ErrorResponse(`cannot delete a user except yourself or if you're an ADMIN`,ErrorTypes.UNAUTHORISED)
              }
            } catch (error) {
            throw new ErrorResponse(`unable to delete the user due to DB error: ${error.message}`,error.type);
            }
    case DataElement_Types.Product:
        return false;
    default:
        throw new ErrorResponse(`Please provide what to delete`,ErrorTypes.WRONG_DATA);
}
    
}

