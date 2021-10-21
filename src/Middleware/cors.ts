import cors from 'cors'
import { ErrorResponse, ErrorTypes } from '../types';

const whitelist = new Set(["https://example1.com", "https://example2.com","http://localhost:3000"]); //update with your domain
//when testing with postman add one of those in the origin header when making a request

const corsOptions:cors.CorsOptions= {
  optionsSuccessStatus: 200, //for some browsers because it will send an options verb to check if the server supports cors first
  origin:function(origin, callback) {
    if (whitelist.has(origin!)) { //here add || !origin if you want to not block server to server requests 
      callback(null, true);
    } else {
      callback(new ErrorResponse(`Not allowed by CORS`,ErrorTypes.INTERNAL_SERVER_ERROR));
    }
  } ,
  credentials: true //very important for cookies, MUST BE SET ON FRONT END TOO. basically means if you want to accept cookies both server and browser must say we accept credentials (cookies)
};


export default cors(corsOptions);

