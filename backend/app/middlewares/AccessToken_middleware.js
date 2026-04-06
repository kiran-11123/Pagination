import { refresh_token_middleware } from './RefreshToken_middleware.js';
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET;


export const Access_token_Middleware = (req, res, next) => {
      
    try{

        const token = req.cookies.token;
        if (!token) {

            const new_token = refresh_token_middleware(req,res);

            if(!new_token){
                return res.status(401).json({
                    message: "Unauthorized Token"
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