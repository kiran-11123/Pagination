
import { GetDataService } from "../service/DataService.js"

export const GetDataController = async (req,res)=>{
       
    try{
          
          

        const data  = await GetDataService();

        return res.status(200).json({
              message : "Data fetched successfully",
              products : data
        })
         

    }
    catch(er){


          return res.status(500).json({
             message : "Internal server Error"
          })
          
    }
}