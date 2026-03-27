import prisma from "../../../Global/db.js";
import { generateOTP } from "../../../Global/utils/generate_otp.js";
import transporter from "../../../Global/nodemailer/node.js";

export const ForgotPasswordService = async (email) => {

    try {


        const find_email = await prisma.user.findUnique({
            data: {
                email: email
            }
        })

        if (!find_email) {
            throw new Error('Email Validation Failed')
        }

        const otp = generateOTP();
        const expiresOn = new Date(Date.now() + 15 * 60 + 1000);

        const find_otp_model = await prisma.otp.findUnique({
             data : {
                email:email
             }
        })

        if(!find_otp_model){
             throw new Error('OTP model is not present')
        }

        const otp_data = await prisma.otp.update({
            data: {
                otp: otp.toString(),
                expiresOn
            }
        })

        let mailoptions = {

            from: "eventnest.official.main@gmail.com",
            to: email,
            subject: "Password Change Code ",
            text: "Please find the code to reset the password.",
            html: `
               
           <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
      
      <h1 style="color: #4CAF50; text-align: center;margin-bottom:20px;">
        Enter this code to reset your password
      </h1>

      <div style="text-align:center;">
        <div style="
          display: inline-block;
          padding: 12px 25px;
          background-color: #ffffff;
          border: 2px dashed #4CAF50;
          border-radius: 8px;
          font-size: 22px;
          letter-spacing: 4px;
          font-weight: bold;
          color: #333;">
          ${otp}
        </div>
      </div>

      <p style="color:#555; text-align:center; margin-top:25px; font-size: 14px;">
        If you did not request this, you can safely ignore this email.
      </p>

    </div>
            `
        }

        await transporter.sendMail(mailoptions);

        return true;



    }
    catch (er) {
        throw er;
    }
}


export const ResetPasswordService = async(user_id , email ,  otp , password)=>{

    try{

        const find_user = await prisma.user.findUnique({
             data:{
                UserId : user_id
             }
        })

        if(!find_user){
            throw new Error('User Not Found')
        }

        const find_otp = await prisma.otp.findUnique({
              data :{
                email : email 
              }
        })

        if(!find_otp){
             throw new Error('OTP is not created')
        }

        if(otp !== find_otp.otp || Date.now() > find_otp.expiresOn){

            throw new Error('OTP expired')
              
        }

        const new_password_hash = await bcrypt.hash(password , 10);

        const update_new_password = await prisma.user.update({
            data : {
                password : new_password_hash
            },
            where:{
                 email  :email , 
                 UserId : user_id
            }
        })

    }
    catch(er){
         throw er;
    }
     
}


export const ChangePasswordService  =async(user_id , email , new_password) =>{
      
    try{

         const find_user = await prisma.user.findUnique({
             data:{
                UserId : user_id
             }
        })

        if(!find_user){
            throw new Error('User Not Found')
        }


        const new_password_hash = await bcrypt.hash(new_password , 10);

        const update_password = await prisma.user.update({
             data : {
                password : new_password_hash
             },where:{
                 UserId : user_id , 
                 email:email 
             }
        })


        return True

    }
     catch(er){

        throw er
         
     }
}