import { RemoveItemsService } from "../services/RemoveCartService.js";

export const RemoveCartController = async(req,res)=>{
     
     try{
        if(!req.user_id){
            return res.status(400).json({
                message : "User Id Not Found"
            })
        }
        
        const { cart_id , item_id } = req.body;

        if(!cart_id || !item_id){
            return res.status(400).json({
                message : "Cart Id and Item Id are required"
            })
        }

        const result = await RemoveItemsService(req.user_id, cart_id, item_id);
        return res.status(200).json({
            message : "Item Removed Successfully",
            data : result
        })  

        }

        catch(er){


            if(er.message === 'Cart not found for this user' || er.message === 'Cart does not belong to this user' || er.message === 'Item not found in cart'){
                return res.status(400).json({
                    message : er.message
                })
            }

            return res.status(500).json({
                message : "Internal Server Error"
            })
        }   

}