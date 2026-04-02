

interface Products{
     
    productId : number,
    productName :string,
    price : number,
    category : string
}



export default function Card(product : Products){
     
    return(
         <div className="flex flex-col max-w-md backdrop-blur-xl bg-white/20  border-white h-96 p-4 shadow-xl items-center justify-between border rounded font-roboto">

            <div className="flex  gap-10">

                 <h1>ProductName </h1>

            </div>

            <div>
                <button>Add to Cart</button>
            </div>
             
         </div>
    )
}