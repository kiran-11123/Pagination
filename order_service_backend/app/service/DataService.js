import prisma from "../../global/database.js";



export const GetDataService  = async()=>{
       
    try{


        const data  = await prisma.product.findMany();

        return data;

    }
    catch(er){
        throw er;
    }
}