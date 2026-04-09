import transporter from "../transporter";


export const Auth_Email_Servive = async(data)=>{
       
    try{

       await  transporter.sendMail(data);
       return true;

    }
    catch(er){
         throw er;
    }
}