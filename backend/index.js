import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';





import Page_Router   from './app/routes/Pagnataion.js';
import Auth_Router from './app/routes/Auth_Routes.js';








const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser);





app.use("/api/v1" , Page_Router)
app.use("/api/v1/auth" , Auth_Router);










app.listen(5000,()=>{
    console.log("Server is Running")
})