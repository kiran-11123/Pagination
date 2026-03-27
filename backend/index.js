import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv'
dotenv.config();




import Page_Router   from './app/routes/Pagnataion.js';
import Auth_Router from './app/routes/Auth/Auth_Routes.js';
import Credentails_Router from './app/routes/Auth/Credentials_Manager_Routes.js';






const port  = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());




const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: 'Too many requests from this IP, please try again after 15 minutes'
})

app.use(limiter);



app.use("/api/v1" , Page_Router)
app.use("/api/v1/auth" , Auth_Router);
app.use("/api/v1/credentails" , Credentails_Router);









import logger from './Global/logger.js';
app.listen(port,()=>{
    logger.info("Server is Running")
})