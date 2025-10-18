import express from 'express'
const Page_Router = express.Router();
import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

Page_Router.get("/page" , async(req,res)=>{

    try{

         const input = req.query.page || "0"; // get page number from query
        let page = parseInt(input);

        if (isNaN(page) || page < 0) page = 0; // fallback to page 0

        const skip = page * 10; // items to skip per page
         
        
        const data = await prisma.Transaction.findMany({
            skip:skip,
            take:10
        })

        if(!data || data.length === 0){
            return res.status(400).json({
                message:"Data not found..."
            })
        }

        return res.status(200).json({
            message:"Data Fetched successfully...",
            data : data
        })


    }
    catch(er){
         return res.status(500).json({
            message:"Internal Server Error..",
            error:er
         })
    }
})















export default Page_Router;