import connectRedis from "connect-redis";
import session from "express-session";
import redis from 'redis';
require('dotenv').config();

const RedisStore = connectRedis(session)
const redisClient = redis.createClient()


export default session({
    name:'sessionID',
    store: new RedisStore({ client: redisClient,
    disableTouch:true }),
    cookie:{
      maxAge: 1000*60*60, //60 minutes,
      httpOnly: true,
      secure: process.env.NODE_ENV==="production"?true:false, //true in production!,
      sameSite: 'lax' //for csrf
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET!,
    resave: false,
  })