import axios from "axios";
import { useState } from "react";

const BASEURL = import.meta.env.VITE_BASE_API;




export default function ForgetPassword() {

     const[email , SetEmail] = useState('');
     const[message , SetMessage] = useState('');
     const[open , isOpen] = useState(false);

     const[otp  , SetOTP] = useState('');
     const[newPassword , SetNewPassword] = useState('');


     async function SubmitForm(c:any) {

         c.preventDefault();

         try{

            const response = await axios.post(`${BASEURL}auth/forgot-password` , {
                email
            } ,{
                withCredentials : true
            })

            if(response.status === 200){
                 SetMessage(response.data.message);

                 setTimeout(()=>{

                    SetEmail('');
                    isOpen(true);

                 } , 1000)
            }
            else{
                SetMessage(response.data.message);
            }

         }
         catch(er){
              
            SetMessage('An error occurred during Changing Password. Please try again later.')
         }
         finally{
             setTimeout(()=>{
                 
                SetMessage('');
             } , 2000)
        }
        
     }
    
     async function submitResetPasswordForm(e:any){

        e.preventDefault();

        try{

            const response = await axios.post(`${BASEURL}/api/v1/auth/reset-password` ,{
                 otp ,
                newPassword
            },{
                withCredentials: true
            })

            if(response.status === 200){
                  
                SetMessage(response.data.message);

                setTimeout(()=>{

                    SetOTP('');
                    SetNewPassword('');
                    isOpen(false);

                } , 1000)
            }
            else{
                SetMessage(response.data.message);

                
            }

        }
        catch(er){
             SetMessage('An error occurred during Resetting  Password. Please try again later.')
        }
        finally{
             setTimeout(()=>{
                 
                SetMessage('');
             } , 2000)
        }
          
     }


     return(
         
        <div className="flex min-h-screen  flex-col items-center justify-center bg-gray-50 px-4 font-poppins ">

             <div className="w-full max-w-md text-sm sm:text-base md:text-lg sm:max-w-lg rounded-xl px-8 shadow-2xl bg-white">

                 <h1 className="font-bold  text-blue-700 text-center text-lg sm:text-xl mb-6 mt-5"> Change Password Here </h1>

                {!open && ( <form className="space-y-2" onSubmit={SubmitForm} >

                    <div>

                        <div>
                            <label className="font-bold text-md sm:text-lg block mb-1">
                                Email
                            </label>

                            <input onChange={(e) => SetEmail(e.target.value)} required value={email} className="w-full px-4 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your Email" type="email" />
                        </div>

                    </div>


                    
                    <button className="px-4 py-2 bg-blue-600 text-white  text-sm  text-center rounded-md hover:bg-blue-800 cursor-pointer transition duration-300 mb-3">Submit</button>


                 </form>   )}


                 {open && (

                    <form className="space-y-2" onSubmit={submitResetPasswordForm} >

                    <div>

                        <div>
                            <label className="font-bold text-md sm:text-lg block mb-1">
                                OTP
                            </label>

                            <input onChange={(e) => SetOTP(e.target.value)} required value={otp} className="w-full px-4 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your OTP" type="text" />
                        </div>

                    </div>


                     <div>

                        <div>
                            <label className="font-bold text-md sm:text-lg block mb-1">
                                New Password
                            </label>

                            <input onChange={(e) => SetNewPassword(e.target.value)} required value={newPassword} className="w-full px-4 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your new Password" type="text" />
                        </div>

                    </div>

                    


                    
                    <button className="px-4 py-2 bg-blue-600 text-white  text-sm  text-center rounded-md hover:bg-blue-800 cursor-pointer transition duration-300 mb-3">Submit</button>


                 </form>  

                 )}






                 {message && (
                    <p className="font-black text-md text-center sm:text-lg mb-5">{message} </p>
                )}

             </div>

        </div>
     )







} 