import { useState } from "react";


export default function Home(){
      
    return(
         <div className="bg-gray-200 h-screen flex flex-col items-center justify-between  ">
              
              <div className="flex max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-xl  lg:max-w-full items-center justify-between bg-gradient-to-r from-blue-900 to-violet-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer">
                   <div className="px-4 py-2 rounded-md border border-white hover:bg-gray-500  ">
                       NetFly
                   </div>

                   <div className="flex items-center justify-between gap-10">

                        <button className="px-4 py-2 cursor-pointer hover:bg-gradient-to-tr from-white/20 via-white/5 to-transparent  rounded-md  shadow-md">
                             Login
                        </button>

                        <button className="px-4 py-2 cursor-pointer hover:bg-gradient-to-tr from-white/20 via-white/5 to-transparent  rounded-md  shadow-md">
                            Register
                        </button>

                   </div>
              </div>
           
               
         </div>
    )
}