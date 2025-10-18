import { useState } from "react"
 

export default function Home(){

    const[data,setData]  =useState([]);


    async function GetData() {

        try{

            const response = await 
            
        }
        catch(er){
            return resizeBy.status(500).json({
                message:"Internal Server Error..."
            })
        }
        
    }

     
    return(
        <div className="flex flex-col overflow-auto sm:flex-row items-center justify-between flex-wrap p-5  bg-slate-50 rounded-md">
            
              


            
        </div>
    )
}