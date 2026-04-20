import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { refresh_token } from '../../Global/utils/refresh_token.js';
import { generate_token } from '../../Global/utils/jwt.js';
import logger from '../../Global/logger.js';
dotenv.config();
const REFRESH_TOKEN = process.env.REFRESH_TOKEN



export const refresh_token_middleware = (req,res,next)=>{

    logger.info({
        message : 'AccessToken is generating using the RefreshToken'
    })

    console.log("Refresh Token in Middleware" , req.cookies.refresh_token)


    try{

        const refresh_token_new = req.cookies.refresh_token;

        if(!refresh_token_new){
            return res.status(401).json({
                message : 'Refresh Token is missing'
            })
        }

        const decoded = jwt.verify(refresh_token_new , REFRESH_TOKEN );

        if(!decoded){
            return res.status(401).json({
                message : 'Invalid Refresh Token'
            })
        }

        // Remove exp property to avoid conflict when generating new token
        const { exp, iat, ...payloadData } = decoded;
        const new_access_token = generate_token(payloadData) 

        res.cookie("token", new_access_token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict", 
            maxAge: 15*60*1000
        })

        logger.info({
            message : "New AccessToken is generated"
        })

        // Don't send response here - just call next() to continue the middleware chain
        next();

    }
    catch(er){
        logger.info({
            message : `Error while generating the new AccessToken , ${er}`
        })

        return res.status(500).json({
            message: "Internal Server Error",
            error: er
        })
    }
}


