import { SignInService, SignUpService  , DeleteUserService} from "../services/Auth_Services.js";

import logger from "../../others/logger.js";
import zod from 'zod';

const zod_SigninSchema = zod.object({
    email: zod.string().email("Invalid Email Format").transform((val) => val.toLocaleLowerCase()),
    password: zod.string()
})

const zod_SignUpSchema = zod.object({
    username: zod.string().min(3, "Name must be at least 3 characters").max(50, "Name is too long"),
    email: zod.string().email("Invalid Email Format").transform((val) => val.toLocaleLowerCase()),
    password: zod.string().min(6, "Password mustbe atleast 6 characters").max(20, "Password is too long")
})


export const SigninContoller = async (req, res) => {

     logger.info({
      message: "Signin request received",
      email: req.body.email
    });

    try {


        const validating_data = zod_SigninSchema.safeParse(req.body);

        if (!validating_data.success) {

            return res.status(400).json({
                message: "Validation failed",
                errors: validating_data.error.flatten().fieldErrors
            });

        }

        const { email, password } = req.body;
         
        const token = await SignInService(email, password)


        if (token === null) {
            return res.status(400).json({
                message: "Credentails Wrong"
            })
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000

        })

         logger.info({
         message: "Signin Successfull",
         email: req.body.email
    });

        return res.status(200).json({
            message: 'User LoggedIn successfully',

        })
       

    }
    catch (er) {

         logger.info({
      message: `Error while Signin , ${er}`,
      email: req.body.email
    });


        if (er.message === 'Credentails Wrong') {
            return res.status(400).json({
                message: "Credentails Wrong"
            })
        }

        return res.status(500).json({
            message: 'Internal Server Error',
            error: er
        })

    }
}



export const SignUpController = async (req, res) => {

     logger.info({
      message: "Signup request received",
      email: req.body.email,
      
    })

    try {


        const validate_schema = zod_SignUpSchema.safeParse(req.body);

        if (!validate_schema.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validate_schema.error.flatten().fieldErrors
            });
        }
        const { email, username, password } = req.body;

      await SignUpService(email, username, password)


         logger.info({
      message: "Signup Successfull",
      email: req.body.email
    });

        return res.status(201).json({
            message: "User Registered Successfully"
        })

    }

    catch (er) {


         logger.info({
      message: `Error Occured while Signup , ${er}`,
      email: req.body.email,
    });
        if (er.message === 'Email Already registred...') {
            return res.status(400).json({
                message: 'Email Already registred...'
            })
        }
        else if (er.message === 'Username already taken') {
            return res.status(400).json({
                message: 'Username already taken'
            })
        }

        return res.status(500).json({
            message: 'Internal Server Error',
            error: er
        })
    }


}

export const DeleteUserController = async(req,res)=>{
      
    try{

        const userid = req.user.user_id;

        const delete_user = await DeleteUserController(userid);

        return res.status(200).json({
            message : "User Deleted Successfully"
        })

        

    }
    catch(er){
         
        if(er.message === 'User Not Found'){
             return res.status(400).json({
                message : 'User Not Found'
             })
        }

        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}