import prisma from "../../../Global/db.js";


export const ForgotPasswordService = async (email)=>{
      
    try{ 


        const find_email = await prisma.user.findUnique({
            data:{
                email : email
            }
        })

        if(!find_email){
             
            throw new Error('Email Validation Failed')
        }
        
        


    }
    catch(er){
        throw  er;
    }
}
