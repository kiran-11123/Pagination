

interface Products{
     
    productId : number,
    productName :string,
    price : number,
    category : string
}



export default function Card(item : Products){
     
    return(
         <div className="flex flex-col max-w-md backdrop-blur-xl bg-white/20  border-white h-96 p-4 shadow-xl items-center justify-between border rounded font-roboto">

            <div className="flex flex-col gap-5 items-center justify-center">

                 <h1>{item.productName}</h1>
                    <p>{item.category}</p>   
                    <p>${item.price}</p>


            </div>

            <div>
                <button>Add to Cart</button>
            </div>
             
         </div>
    )
}