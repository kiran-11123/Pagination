import prisma from '../db.js';
import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET =process.env.JWT_SECRET; 

const Auth_Router  = express.Router();


Auth_Router.post("/signin", async (req,res)=>{


    try{
          
        const{email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "Email or Password is missing"
            })
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
            message  : "Internal Server Error",
            error:er
        })
    }
     
})









export default Auth_Router;