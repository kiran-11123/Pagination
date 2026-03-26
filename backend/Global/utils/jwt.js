import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generate_token = (details)=>{
     
    const token = jwt.sign(details, JWT_SECRET, { expiresIn: "15m" })
    
    return token;
}