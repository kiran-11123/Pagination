import dotenv from 'dotenv';
import express from 'express'
const app = express();
app.use(express.json());
dotenv.config();
import Auth_email_router from './app/routes/Auth_email.js';
const port = process.env.PORT || 5003;


app.use('/v1/email' , Auth_email_router)





app.listen(port , ()=>{
       
     console.log(`Email Service Running on PORT : ${port}`);
})




