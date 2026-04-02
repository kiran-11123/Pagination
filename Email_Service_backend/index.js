import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const MAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;



const transporter = nodemailer.createTransport({
     service : "gmail",
     auth :{
        user: "eventnest.official.main@gmail.com", 
          pass: MAIL_APP_PASSWORD,
     },
     tls:{
         rejectUnauthorized: false,  
     },
})

export default transporter