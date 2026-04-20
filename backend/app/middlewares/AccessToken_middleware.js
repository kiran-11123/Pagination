import { refresh_token_middleware } from './RefreshToken_middleware.js';
import dotenv from 'dotenv'
dotenv.config();
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET;

export const Access_token_Middleware = (req, res, next) => {
      
    try{

        const token = req.cookies.token;
        console.log("Access Token in Middleware" , token)
        
        if (!token) {
            // Call refresh token middleware to generate a new access token
            refresh_token_middleware(req, res, () => {
                // After refresh token middleware runs, check if new token was set
                const new_token = req.cookies.token;
                
                if(!new_token){
                    return res.status(401).json({
                        message: "Unauthorized - No valid token"
                    })
                }
                
                // Continue to verify the new token
                const decoded = jwt.verify(new_token, JWT_SECRET);
                req.user = decoded;
                next();
            });
            return;
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