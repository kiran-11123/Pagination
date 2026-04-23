import prisma from "../../global/db.js";



export const GetDataService = async(user_id)=>{
      
    try{
              
        const get_data = await prisma.cart.findunique({
                
            where:{
                user_id : user_id
            }
        })

        if(!get_data) {
             
            throw new Error('User Not Found')
        }

        return get_data;
    }
    catch(er){

        throw er;
         
    }
}

export const Get_Items_Count = async(user_id)=>{
      
    try{

        const get_data = await prisma.cart.findunique({
            where:{
                user_id : user_id

            }
        })

        if(!get_data) { 

            throw new Error('User Not Found')
        }

        return get_data.items.length;

    }
    catch(er){
          throw er;
    }
}