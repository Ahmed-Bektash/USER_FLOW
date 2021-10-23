

export interface RequestInterface{
    path: string,
    method: string,
    params?: undefined | paramsDictionary,
    query?: undefined |any, //later define query interface with all possible properties
    body?: any, //later define a body respone type
    session?: sessionInterface
}

type paramsDictionary={
    [key: string]: string;
}


export interface ResponseInterface{
    headers?: undefined|string|string[],
    status: number,
    restype?: undefined|string,
    body?: any, //for now
    session?: sessionInterface
}

interface sessionInterface {
    uid?: string,
    role?:UserRole,
    loggedout?:boolean
}

export interface userInfo{
    id?: string,
    firstName?:string,
    lastName?: string,
    phone?: string,
    email?:string,
    paid?: boolean,
    password?: string,
    type?: UserRole,
    updateDate?: Date,
    uploads?: string[],
    relations?: string[],
    products?: string[],
    resetPasswordToken?: String,
    resetPasswordExpire?: number
}

export enum UserRole {
    UNDEFINED="Undefiend", //deffault
    ADMIN = "Admin",
    BASIC = "Basic",
    PREMIUM = "Premium",
    BUSINESS = "Business",
    PREMIUM_BUSINESS= "Premium_Business"
}

export enum Page_type{
    ADMIN='Admin', //only admin can access
    PRIVATE= 'Private', //only signed in user can access
    PAID ='Paid', //only paid users can access this
    PUBLIC = "Public" //default
}

export interface returnObject{
    success: boolean,
    message: string,
    body?: any
}


export interface EmailOptions{
    EmailTo: string,
    subject: string,
    text: string
}

export type Controller= (request:RequestInterface)=>Promise<ResponseInterface>
export type DataElement= userInfo

export enum DataElement_Types{
    'User',
    'Upload',
    'Product'
}



export enum verifyType{
    Email = 'email',
    ID ='ID',
    Email_Passwod= 'email&password',
    Token ='token'
}

export enum ErrorTypes{
    BAD_REQ = 400,
    NOT_AUTHENTICATED = 401,
    UNAUTHORISED = 403,
    RESOURCE_NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    WRONG_DATA = 300,
    USER_EXISTS = 301,
    DB_ERROR = 302,

}

export class ErrorResponse extends Error {
    type:ErrorTypes;
  
    constructor(message:string, type:ErrorTypes) {
      super(message);
      this.type = type;
    }
  }