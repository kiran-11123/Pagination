import { refresh_token_middleware } from './RefreshToken_middleware.js';
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
import axios from 'axios';
const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL

export const Access_token_Middleware = (req, res, next) => {
      
    try{

        const token = req.cookies.token;
        console.log("Access Token in Middleware" , token)
        
        if (!token) {

            const new_token = refresh_token_middleware(req,res);

            if(new_token instanceof Object && new_token.statusCode === 401){

                axios.post(`${BASE_URL}logout/logout`, {}, { withCredentials: true })   
                return res.status(401).json({
                    message: "Unauthorized - No token provided and refresh token is invalid or missing"
                })
            }

            
                
        const token_new = req.cookies.token;

        if(!token_new){
                return res.status(401).json({
                    message: "Unauthorized"
                })

            }
        }



        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();


    }

    catch(er){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}