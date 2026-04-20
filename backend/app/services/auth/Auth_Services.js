import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import prisma from '../../../Global/db.js';
import { generate_token  } from '../../../Global/utils/jwt.js';
import { refresh_token } from '../../../Global/utils/refresh_token.js';
dotenv.config();









export const SignInService = async (email, password) => {

    try {


        const find_user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!find_user) {
            throw new Error("Credentails Wrong")
        }

        const password_check = await bcrypt.compare(password, find_user.password)


        if (!password_check) {
            throw new Error("Credentails Wrong")
        }

        const details = {
            user_id: find_user.UserId,
            username: find_user.username,
            email: find_user.email,
        }

        const token = generate_token(details);
        const refresh_token_new = refresh_token(details);

        console.log("Access Token in SignIn Service" , token)
        console.log("Refresh Token in SignIn Service" , refresh_token_new)


        return {token , refresh_token_new}

    }
    catch (er) {


        throw er

    }
}


export const SignUpService = async (email, username, password) => {

    try {

        const find_user = await prisma.user.findUnique({
            where: {
                email,
            }
        })


        if (find_user) {
            throw new Error("Email Already registred...")
        }

        const find_username = await prisma.user.findUnique({
            where: {
                username: username,
            },
        })

        if (find_username) {
            throw new Error("Username already taken")
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const new_user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashpassword,
            },
        })

        const create_otp_model = await prisma.otp.create({

            data : {
                email: email
            }
             
        })

        return new_user
    } catch (er) {
        throw er
    }
}


export const DeleteUserService = async(userid)=>{
       
    try{

        const find_user = await prisma.user.findUnique({
            where :{
                UserId : userid
            }
        })

        if(!find_user){
             throw new Error('User Not Found')
        }

        await prisma.user.delete({
            where : {
                UserId : userid
            }
        })

    }
    catch(er){
        throw er;
    }
}