import logger from "../../../Global/logger.js"
import zod, { email } from 'zod'
import { ForgotPasswordService } from "../../services/auth/Credentials_Manager_Service.js"


const Verify_email = zod.object({
     email : zod.string().email("Invalid Email Format").transform((val)=>val.toLocaleLowerCase())
})


const verify_credentails_toReset_password = zod.object({
      email : zod.string().email("Invalid Email Format").transform((val) => val.toLocaleLowerCase()),
      password: zod.string().min(6, "Password should be minimum   characters")
})


export const ForgotPasswordController = async (req,res)=>{

    try{

        const {email } = req.body;

        const validate_email = Verify_email.safeParse(email);

        if(!validate_email){
              return res.status(400).json({
                   message: validating_data.error.flatten().fieldErrors
              })
        }

        const result   = await ForgotPasswordService(email);
        
        if(result===true){
             return res.status(200).json({
                message : 'OTP Sent to your email'
             })
        }



    }
    catch(er){
          
        logger.info({
            message : `Error occured in ForgotPassword ${er}`
        })

        if(er.message === 'Email Validation Failed'){
            return res.status(400).json({
                message : "Email Validation Failed"
            })
        }

        return res.status(500).json({
            message : 'Internal Server Error',
            error:er
        })
    }

} 



export const ResetPassword = (req,res)=>{
     
}