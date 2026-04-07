import { GetDataService } from "../services/GetDataService.js"



export const GetCartController = async(req,res)=>{
       
    try{

        if(!req.user_id){
            return res.status(400).json({
                message : "User Id Not Found"
            })
        }


        const get_data = await GetDataService(req.user_id);

        return res.status(200).json({
            message : "Cart Data Fetched Successfully",
            data : get_data
        })

    }
    catch(er){

        if(er.message === 'User Not Found'){
              
            return res.status(400).json({
                message : "Cart is not Created for the User"
            })
        }
        

        return res.status(500).json({
            message : "Internal server Error"
        })
    }
}