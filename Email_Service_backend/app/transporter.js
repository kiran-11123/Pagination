import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
     service : "gmail",
     auth :{
        user: "eventnest.official.main@gmail.com", 
          pass: MAIL_PASSWORD,
     },
     tls:{
         rejectUnauthorized: false,  
     },
})

export default transporter