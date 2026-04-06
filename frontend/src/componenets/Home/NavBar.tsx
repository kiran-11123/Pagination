import { useState } from "react";
import {X , Menu} from "lucide-react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_BASE_API
export default function NavBar(){

     const navigate = useNavigate();

    const[open , isOpen] = useState(false); 
    const[message , SetMessage] = useState('');


    async function  HandleLogout(e:any) {

       e.preventDefault();

       try{

           const response = await axios.post(`${API_URL}auth/logout` , {} , {
                withCredentials : true
           })

           if(response.status === 200){
                localStorage.removeItem('isAuthenticated');
                navigate("/", { replace: true });

           }
           else{
                
               SetMessage(response.data.message);
           }

       }
       catch(er : any){
           SetMessage(er);
       }

       finally{

          SetMessage('');
           
       }
     
    }
      
    return(
         <div>

            <div className="flex items-center justify-between  rounded-lg font-poppins px-5 py-3 bg-gray-300">

           

                <div className="md:text-xl  text-sm  font-bold text-gray-800">
                    Shopping Space
                </div>

                <div className="items-center space-x-4 hidden sm:flex">
                    <button className="px-4 py-2 bg-gray-600 text-white  text-sm  text-center rounded-md hover:bg-gray-800 cursor-pointer transition duration-300">Cart</button>
                    <button onClick={HandleLogout} className="px-4 py-2 bg-blue-600 text-white  text-sm  text-center rounded-md hover:bg-blue-800 cursor-pointer transition duration-300">Logout</button>
                </div>

                 <div className="sm:hidden flex items-center">
                         <button onClick={() => isOpen(!open)} className="text-black  focus:outline-none">
                              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                         </button>
                    </div>

             </div>


             <div className="flex flex-col items-center font-poppins gap-6 justify-center w-full px-4  z-index-100">

                    {open && (
                         <div className="sm:hidden w-full max-w-xl px-6 mt-2 flex flex-col gap-2  rounded-xl shadow-xl text-center text-sm py-4 ">
                              <button   className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-white/20 transition font-medium shadow-md">
                                   Cart
                              </button>
                              <button  onClick={HandleLogout} className="px-4 py-2 rounded-lg bg-purple-400 hover:bg-purple-600 transition font-medium shadow-md">
                                      Logout
                              </button>
                         </div>
                    )}

                    


               </div>



             
             
         </div>
    )
}