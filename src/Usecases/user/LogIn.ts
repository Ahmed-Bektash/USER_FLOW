import { DB_verifyElement } from "../../DB_Manager/DB_Manager";
// import User from "../Entities/User";
import { DataElement_Types, ErrorResponse, ErrorTypes, userInfo, verifyType } from "../../types";


export default async function login(userinfo:userInfo){
    

    try {
    //   const user= User(userinfo);
        
      const verifiedUser =  await DB_verifyElement(userinfo,DataElement_Types.User,verifyType.Email_Passwod);
    
      return verifiedUser;

    } catch (error) {
    
      throw new ErrorResponse(`unable to login the user due to DB error: ${error.message}`,ErrorTypes.WRONG_DATA);
  

    }
}