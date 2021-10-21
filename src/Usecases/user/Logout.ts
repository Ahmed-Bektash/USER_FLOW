import { DB_verifyElement } from "../../DB_Manager/DB_Manager";
// import User from "../Entities/User";
import { DataElement_Types, ErrorResponse, ErrorTypes, userInfo, verifyType } from "../../types";


export default async function logout(userinfo:userInfo){
    

    try {
    //   const user= User(userinfo);
        
      const verifiedUser =  await DB_verifyElement(userinfo,DataElement_Types.User,verifyType.ID);

     return  verifiedUser?true:false;

    } catch (error) {
    
      throw new ErrorResponse(`unable to logout the user due to DB error: ${error.message}`,ErrorTypes.WRONG_DATA);
  

    }
}