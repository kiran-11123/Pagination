import { useState } from "react";
import Login from "../Auth_Pages/Login";
import Register from "../Auth_Pages/Register";
import { useNavigate } from "react-router-dom";

export default function Home() {

     const navigate = useNavigate();


     function ToLogin() {
          navigate("/login")
     }

     function ToRegister() {
          navigate("/register")
     }

     return (
          <div className="bg-gray-200 h-screen flex flex-col items-center gap-40">



               <div className="flex  max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-xl  lg:max-w-full items-center justify-between bg-gradient-to-r from-blue-900 to-violet-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer">
                    <div className="px-4 py-2 rounded-md border border-white ">
                         NetFly
                    </div>

                    <div className="flex items-center justify-between gap-10 font-roboto">

                         <button onClick={ToLogin} className="px-4 py-2 cursor-pointer hover:bg-gradient-to-tr from-white/20 via-white/5 to-transparent  rounded-md  shadow-md">
                              Login
                         </button>

                         <button onClick={ToRegister} className="px-4 py-2 cursor-pointer hover:bg-gradient-to-tr from-white/20 via-white/5 to-transparent  rounded-md  shadow-md">
                              Register
                         </button>

                    </div>



               </div>

               <div className="flex flex-col items-center text-center bg-white/20 backdrop-blur-md border border-white/20 px-8 py-6 rounded-2xl shadow-lg max-w-lg sm:max-w-xl md:max-w-2xl">

                    <h2 className="text-sm sm:text-base font-bold mb-3">
                         NetFly – Stream Your World 
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed">
                         A modern movie management and streaming platform that allows users to
                         store, organize, and seamlessly watch movies with a smooth and intuitive experience.
                    </p>

               </div>




          </div>
     )
}