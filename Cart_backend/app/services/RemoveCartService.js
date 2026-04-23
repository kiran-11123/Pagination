import prisma from "../../global/db.js";




export const RemoveItemsService = async(user_id , cart_id  , item_id)=>{
      
    try{

        const get_user = await prisma.cart.findUnique({
              where : {
                user_id : user_id
              }
        })

        if(!get_user){
             throw new Error('User Not Found')
        }


        const get_cart = await prisma.cart.find({
            where  : {
                   Cart_id : cart_id
            }
        })


        get_cart.filter((item)=> item.id!=cart_id);

        await get_cart.save();
        



    }
    catch(er){
         
        throw er;
    }
}