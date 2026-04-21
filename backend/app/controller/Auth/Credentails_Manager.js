import logger from "../../../Global/logger.js"
import zod, { email } from 'zod'
import { ForgotPasswordService , ResetPasswordService , ChangePasswordService} from "../../services/auth/Credentials_Manager_Service.js"


const Verify_email = zod.object({
     email : zod.string().email("Invalid Email Format").transform((val)=>val.toLocaleLowerCase())
})


const verify_credentails_toReset_password = zod.object({
      email : zod.string().email("Invalid Email Format").transform((val) => val.toLocaleLowerCase()),
      password: zod.string().min(6, "Password should be minimum   characters")
})


export const ForgotPasswordController = async (req,res)=>{

    try{

        console.log("Forgot Password Request received for the email " , req.body.email)

        logger.info({
            message : `Forgot Password Request received for the email ${req.body.email}`
        })

        const {email } = req.body;

        const validate_email = Verify_email.safeParse(email);

        if(!validate_email){
              return res.status(400).json({
                   message: validating_data.error.flatten().fieldErrors
              })
        }

        const result   = await ForgotPasswordService(email);
        
        logger.info({
            message : `OTP is sent to the email ${email} for password reset`
        })
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

        else if(er.message === 'OTP model is not present'){
             return res.status(404).json({
                message : "OTP Verification is not created contact Admin."
             })
        }

        return res.status(500).json({
            message : 'Internal Server Error',
            error:er
        })
    }

} 

/* Forgot Password Reset */


export const ResetPassword = async(req,res)=>{
      
    try{

        logger.info({
             message : "Resetting the Password"
        })
         
       
        const {otp , newPassword, email} = req.body;


        if(!otp || !newPassword){
             return res.status(404).json({
                  message : "OTP or password is not present"
             })
        }
        
        const validating_data = verify_credentails_toReset_password.safeParse({email : email, password : newPassword})
        
        if(!validating_data){
             return res.status(400).json({
                  message : validating_data.error.flatten().fieldErrors
             })
        }
        const otp_string = otp.toString();

        

        const result = await ResetPasswordService( email ,  otp , newPassword);
        
         logger.info({
            message : "Password Reset successfull"
         })
        return res.status(201).json({
            message : 'Password reset succesfull'
        })

    }
    catch(er){

        logger.info({
            message : `Error while Resetting the password ${er}`
        })

        if(er.message === 'User Not Found'){
            return res.status(404).json({
                message : "User Not Found"
            })
        }
        else if(er.message === 'OTP is not created'){
             return res.status(400).json({
                 message : "OTP is not created contact Admin. "
             })
        }
        else if(er.message === 'OTP expired'){
            return res.status(401).json({
                message : "OTP expired.."
            })
        }
         
    }
}


/* Changing new Password */


export const ChangePassword = async (req,res)=>{

    logger.info({
       message : `Chnaging the password for the email ${req.body.email}`
    })
      
    try{

        const result  = verify_credentails_toReset_password(req.body);

        if(!result){
            return res.status(400).json({
             
                message  : result.error.flatten().fieldErrors
             })
         } 
            
        

        const {curPassword , newPassword} = req.body;

        const password_change  = await ChangePasswordService(req.user.user_id , curPassword , newPassword);

        logger.info({
            message : "Password Changed Successfull"
        })

    }
    catch(er){
         logger.info({
            message : `Error while Changing the password ${er} `
         })

         if(er.message === 'User Not Found'){
             return res.status(404).json({
                message : "User Not Found"
             })
         }  

            return res.status(500).json({
                message : "Internal Server Error",
                error : er
            })
    }
}

