import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config({ path: '../.env' });

const MAIL_PASSWORD = process.env.GMAIL_APP_PASSWORD;




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventnest.official.main@gmail.com", 
    pass: MAIL_PASSWORD,      
  },
   tls: {
    rejectUnauthorized: false,       
  },
});




export default transporter