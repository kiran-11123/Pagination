import { Minus, Plus } from "lucide-react"
import { useState } from "react"


interface Products{
     
    productId : number,
    productName :string,
    price : number,
    category : string
}



export default function Card(item : Products){

    const[ProductCount , SetProductCount] = useState(0);
    const[message , SetMessage] = useState('');

    function IncreaseCount(){
           
         SetProductCount(c=>c+1);
    }

    function DecreaseCount(){
        
        try{

             if(ProductCount > 0){
             SetProductCount(c=> c-1);
        }
        else{
             
            SetMessage('cannot decrease further')
        }

        }

        catch(er :any){
             
            SetMessage(er);
        }
        finally{
             
            setTimeout(()=>{
                  SetMessage('');
            } , 1000)
        }

       
    }
     
    return(
        <div className="w-full max-w-xs sm:max-w-sm 
                mx-4 sm:mx-auto
                h-auto sm:h-96
                backdrop-blur-xl bg-white/20 border-white 
                p-4 shadow-xl rounded-md flex flex-col 
                border items-center gap-4 font-roboto">

    <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg font-semibold">{item.productName}</h1>
        <p className="text-sm text-gray-200">{item.category}</p>   
        <p className="text-base font-bold">${item.price}</p>
    </div>

    <div className="flex px-10 py-2 items-center justify-between max-w-xs w-full">

         <Plus className="text-gray-100 rounded-full bg-gray-700"  onClick={IncreaseCount} /> 
             {ProductCount}
         <Minus className="text-gray-100 rounded-full  bg-gray-700"  onClick={DecreaseCount}/>

    </div>

    


    <button className="px-4 py-2 border rounded-lg bg-blue-500 
                       text-white shadow-xl hover:bg-blue-600 
                       hover:font-bold w-full sm:w-auto">
        Add to Cart
    </button>

    {message && (
         <p className="text-xs md:text-sm font-poppins ">{message}</p>
    )}

</div>
    )
}