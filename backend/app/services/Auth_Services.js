import prisma from '../../db.js';
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import zod from 'zod'

dotenv.config();
const JWT_SECRET =process.env.JWT_SECRET; 


const zod_SigninSchema  = zod.object({
     email : zod.string().email("Invalid Email Format" ).transform((val)=>val.toLocaleLowerCase()),
     password : zod.string().min(6 , "Password mustbe atleast 6 characters").max(20 , "Password is too long")
})

const zod_SignUpSchema = zod.object({
      username  : zod.string().min(3, "Name must be at least 3 characters").max(50, "Name is too long"),
       email : zod.string().email("Invalid Email Format" ).transform((val)=>val.toLocaleLowerCase()),
     password : zod.string().min(6 , "Password mustbe atleast 6 characters").max(20 , "Password is too long")
})





export const SignService = async( email  , password )=>{
       
    try{


         const validating_data = zod_SigninSchema.safeParse(email ,password);

         if(!validating_data.success){

             return res.status(400).json({
      message: "Validation failed",
      errors: validating_data.error.flatten().fieldErrors
    });

         }

       

        const check_user = await prisma.user.find({
            where :{
                email : email
            }
        })

        if(!check_user){
            return res.status(404).json({
                message : "User Not found"
            })
        }

        const find_password = await bcrypt.compare(check_user.password , password);

        if(!find_password){
            return res.status(400).json({
                message : "Password is wrong"
            })
        }

        const userDetails = {username : check_user.username , email : check_user.email};

        const token = jwt.sign(userDetails , JWT_SECRET , {expiresIn : "1h"})

        return res.status(200).json({
            message : "User Logged in successfully",
            token : token
        })

    }
    catch(er){


        return res.status(500).json({
            message : "Internal Server Error"
        })

    }
}


export const SignUpService = async(email , username , password)=>{
      
    try{

        const validate_schema  =zod_SignUpSchema.safeParse(email , username, password);

        if(!validate_schema.success){
             return res.status(400).json({
      message: "Validation failed",
      errors: validate_schema.error.flatten().fieldErrors
    });
        }



        const check_user  =await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(check_user){
            
            throw new Error('User Already Registered Please login')
            
        }

        const hash_password = await bcrypt.hash(password , 10);

        await prisma.user.create({
             data :{
                email  :email,
                username : username,
                password : hash_password
             }
        })

        return res.status(201).json({
            message : "User Registered Successfully"
        })

    }
    catch(er){
         
        return res.status(500).json({
            message : "Internal server Error"
        })
    }
}