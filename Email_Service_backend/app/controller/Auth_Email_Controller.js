import { Auth_Email_Servive } from "../service/Auth_Email_Service.js";





export const Email_controller = async(req,res)=>{
       
    try{

         const data = req.data;
         const result = await Auth_Email_Servive(data)

         return true;

    }
    catch(er){

        return res.status(500).json({

            message : "Error while sending the email" ,

        })
          
    }
}