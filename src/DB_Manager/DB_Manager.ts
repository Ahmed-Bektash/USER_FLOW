//abstracts all the DB methods and exposes functions to be used by usecases
import {User} from './entity/User'
import {getConnection, getRepository} from 'typeorm'
import {DataElement, DataElement_Types, ErrorResponse, ErrorTypes, userInfo, UserRole, verifyType} from "../types";


const bcrypt = require('bcrypt');


export async function DB_addElement(element:DataElement,type:DataElement_Types){ 

if(type==DataElement_Types.User){

    const UserRepo = getRepository(User);
    
    const existsingUser = await UserRepo.createQueryBuilder("User")
                                        .where("email=:email", { email: element.email })
                                        .getOne();

    if(existsingUser){
        throw new ErrorResponse(`user already exists`,ErrorTypes.USER_EXISTS);
    }   
    const salt=10;
    const HashedPasswords = await bcrypt.hashSync(element.password, salt);
    

        const newUser= new User();
        
        newUser.first_name=element.firstName as string;
        newUser.last_name=element.lastName  as string;
        newUser.phone_number=element.phone  as string;
        newUser.email=element.email  as string;
        newUser.is_prenium_account=element.paid as boolean;
        newUser.password=HashedPasswords  as string;
        newUser.type=element.type  as UserRole;
        newUser.updatedAt=element.updateDate as Date;
        
    try {
        const   Saveduser = await UserRepo.save(newUser);
                    
        const returnedUser:userInfo={
            id: Saveduser.id,
            firstName:Saveduser.first_name,
            lastName: Saveduser.last_name,
            email:Saveduser.email,
            type: Saveduser.type,
            }
            return returnedUser
        } catch (error) {
            throw new ErrorResponse(`unable to insert user to DB due to ${error.message}`,ErrorTypes.DB_ERROR);
              
        }



    

}else{
    return //for now
}
            
}


export async function DB_verifyElement(element:DataElement,type:DataElement_Types,verifyby:verifyType){
    
    if(type==DataElement_Types.User){
       
        const UserRepo = getRepository(User);
        let existingUser:User;

        if(verifyby===verifyType.Email_Passwod){
            
            try{
                existingUser = await UserRepo.createQueryBuilder("User")
                                                    .where("email=:email", { email: element.email })
                                                    .getOneOrFail();

            }catch(err){
                throw new ErrorResponse(`email does not exist`,ErrorTypes.WRONG_DATA);
            }
            

            if(bcrypt.compareSync(element.password,existingUser.password)){
                const returnedUser:userInfo={
                    id: existingUser.id,
                    firstName:existingUser.first_name,
                    lastName: existingUser.last_name,
                    email:existingUser.email,
                    type: existingUser.type,
                    }
                
                return returnedUser;
            }else{
                throw new ErrorResponse(`incorrect password`,ErrorTypes.WRONG_DATA);
            }
        }else if(verifyby===verifyType.Email){
            try{
                existingUser = await UserRepo.createQueryBuilder("User")
                                                    .where("email=:email", { email: element.email })
                                                    .getOneOrFail();
                return existingUser;

            }catch(err){
                throw new ErrorResponse(`email does not exist`,ErrorTypes.WRONG_DATA);
            }
        }else if(verifyby===verifyType.ID){
            try{
                existingUser = await UserRepo.createQueryBuilder("User")
                                                    .where("id=:id", { id: element.id})
                                                    .getOneOrFail();

                return existingUser;

            }catch(err){
                throw new ErrorResponse(`user does not exist`,ErrorTypes.WRONG_DATA);
            }
        }else if (verifyby===verifyType.Token){
            try{
                
                existingUser = await UserRepo.createQueryBuilder("User")
                                                    .where("reset_password_token=:reset_password_token", { reset_password_token: element.resetPasswordToken})
                                                    .getOneOrFail();
                                                    
                if(parseInt(existingUser.reset_password_expire_time)>Date.now()){
                    return existingUser
                }else{
                    return
                }
               

            }catch(err){
                // user does not exist or token expired
                throw new ErrorResponse(`${err.message}`,ErrorTypes.WRONG_DATA);
            }

        }else{
            return
        }

    }else{
            return
        }

}

export async function DB_UpdateElement(ID:string,type:DataElement_Types,toBeUpdated:Object){
   
    if(!ID){
        throw new ErrorResponse(`ID must be provided`,ErrorTypes.WRONG_DATA);
    }
    
    if(type==DataElement_Types.User){
 
        try {
            await getConnection()
                  .createQueryBuilder()
                  .update(User)
                  .set(toBeUpdated)
                  .where("id = :id", { id: ID })
                  .execute();
             
            
            const returnObj={
                success: true,
                message: 'updated the data!'
            }
 
            return returnObj;
            
        } catch (error) {
            throw new ErrorResponse(error.message,ErrorTypes.DB_ERROR);
        }
       
 
    }else{
        const returnObj={
            success: false,
            message: 'type of data to be updated undefined'
        }
        return returnObj;
    }
 
 }

