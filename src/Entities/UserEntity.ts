import isValidEmail from "../helpers/is-valid-email";
import upperFirst from "../helpers/upper-first";
import crypto from "crypto";
import { userInfo, UserRole} from "../types";


export default class UserEntity{

  
  constructor(userInfo:userInfo){
    this.User_Info=userInfo;
    this.validUser = this.validate(this.User_Info)
    this.normalUser = this.normalize(this.validUser)
  }
  
  User_Info:userInfo={};
  validUser;
  normalUser; 

        getID = ()=>this.normalUser.id;
        getFirstname = ()=> this.normalUser.firstName;
        getLastname = ()=> this.normalUser.lastName;
        getPhone = ()=> this.normalUser.phone;
        getEmail = ()=> this.normalUser.email;
        getIsPaid = ()=> this.normalUser.paid;
        getPassword = ()=> this.normalUser.password;
        getRole = ()=> this.normalUser.type; 
        getUploads = ()=> this.normalUser.uploads; 
        getRelations =()=> this.normalUser.relations;
        getProducts = ()=> this.normalUser.products;
        setRole = (newRole:UserRole)=>{this.normalUser.type=newRole};
        getPassResetToken = ()=>this.GenerateToken();
    
    
  

    

     validate (Info:userInfo):userInfo {
      if(Info.firstName){this.validateString('first', Info.firstName as string)}
      if(Info.lastName){this.validateString('last', Info.lastName as string)}
      if(Info.phone){this.validateString('phone', Info.phone as string)}
      if(Info.email){this.validateEmail(Info.email as string)}
      return Info
    }
  
     validateString (label:string, word:string) {

      if (word.length < 2) {
        throw new Error(
          `A user's ${label} must have at least 2 characters long`
        )
      }
      if((label==='phone') && (word.length<8)){
        throw new Error(
            `The user's ${label} cannot be less than 8 numbers long`
          )
      }
      if(word==='undefined'){
        throw new Error(
            `The user's ${label} cannot be undefined`
          )
      }
    }
  
     validateEmail (email:string) {
      if (!isValidEmail(email)) {
        throw new Error('The email address provided is invalid')
      }
    }

   
     normalize ({ email, firstName, lastName, ...otherInfo }:userInfo):userInfo {
      return {
        ...otherInfo,
        firstName: firstName?upperFirst(firstName as string):'',
        lastName: lastName?upperFirst(lastName as string):'',
        email: email?email.toLowerCase():''
      }
    }

     GenerateToken():string{
      const resetToken= crypto.randomBytes(20).toString("hex");
 return crypto.createHash("sha256").update(resetToken).digest("hex");
    }
}