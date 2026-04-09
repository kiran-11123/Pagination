





export const Email_controller = async(req,res)=>{
       
    try{

         const email = req.email;

         const result = await Auth_Email_Service(email)

    }
    catch(er){
          
    }
}