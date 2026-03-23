import { ca } from "zod/v4/locales";
import { SignInService, SignUpService } from "../services/Auth_Services";


const zod_SigninSchema = zod.object({
    email: zod.string().email("Invalid Email Format").transform((val) => val.toLocaleLowerCase()),
    password: zod.string().min(6, "Password mustbe atleast 6 characters").max(20, "Password is too long")
})

const zod_SignUpSchema = zod.object({
    username: zod.string().min(3, "Name must be at least 3 characters").max(50, "Name is too long"),
    email: zod.string().email("Invalid Email Format").transform((val) => val.toLocaleLowerCase()),
    password: zod.string().min(6, "Password mustbe atleast 6 characters").max(20, "Password is too long")
})


export const SigninContoller = async (req, res) => {

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

        res.cookie("token ", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3600000

        })

        return res.status(200).json({
            message: 'User LoggedIn successfully',

        })


    }
    catch (er) {


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
    try {


        const validate_schema = zod_SignUpSchema.safeParse(email, username, password);

        if (!validate_schema.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validate_schema.error.flatten().fieldErrors
            });
        }
        const { email, username, password } = req.body;

        await SignUpService(email, username, password)

        return res.status(201).json({
            message: "User Registered Successfully"
        })

    }

    catch (er) {
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