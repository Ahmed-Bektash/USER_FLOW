import { DB_addElement } from "../../DB_Manager/DB_Manager";
import { DataElement_Types, ErrorResponse, userInfo } from "../../types";
import UserEntity from "../../Entities/UserEntity";



export default async function AddUser(userinfo:userInfo){
    

    try {
      const user= new UserEntity(userinfo);

      const  userObject:userInfo={
        email: user.getEmail(),
        firstName: user.getFirstname(),
        lastName: user.getLastname(),
        phone: user.getPhone(),
        paid: user.getIsPaid(),
        password: user.getPassword(),
        type: user.getRole(),
        updateDate: userinfo.updateDate
       }
         
        
      const savedUser =  await DB_addElement(userObject,DataElement_Types.User);
    
      return savedUser;

    } catch (error) {
      throw new ErrorResponse(`unable to add the user due to DB error: ${error.message}`,error.type);

    }
}
