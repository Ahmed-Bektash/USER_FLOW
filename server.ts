//imports
import express from 'express';
import userRouter from "./src/Routes/userRouter";
import productsRouter from './src/Routes/productsRouter';
import {ERRH} from './src/Middleware/ERRH'
import "reflect-metadata";
import {createConnection} from "typeorm";
require('dotenv').config();
import { ErrorResponse, ErrorTypes } from './src/types';
import sessionConfig from './src/Middleware/sessionConfig'
import corsMW from './src/Middleware/cors'



//initializations
const app = express();
app.use(express.json());

//for sessions in production when using nginx:
// app.set('trust proxy',1);

app.use(corsMW);

app.use(sessionConfig);



//routes
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", userRouter);
app.all('*',(req,res,next)=>{
  const path = req.url
  const method= req.method
  next(new ErrorResponse(`page not found on url ${path} for ${method}`,ErrorTypes.RESOURCE_NOT_FOUND))
  res.end();
})

app.use(ERRH);




createConnection(process.env.NODE_ENV as string).then(async connection => {
    
    await connection.runMigrations();

    const server =app.listen(5000, () => {
      console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`)
    });   

    process.on("unhandledRejection",(error)=>{ //this also takes a promise with the error --> read more into it
      console.log("There is an error",error);
      server.close(()=>process.exit(1));
    })
   

}).catch(error => console.log(error));


export default app;

