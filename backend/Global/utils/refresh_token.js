import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const REFRESH_TOKEN = process.env.REFRESH_TOKEN


export const refresh_token = (details)=>{

    const refresh_token_new = jwt.sign(details , REFRESH_TOKEN , {expiresIn : "7d"});

    

    return refresh_token_new;
      
}