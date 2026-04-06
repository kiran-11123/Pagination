

interface Products{
     
    productId : number,
    productName :string,
    price : number,
    category : string
}



export default function Card(item : Products){
     
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

    <button className="px-4 py-2 border rounded-lg bg-blue-500 
                       text-white shadow-xl hover:bg-blue-600 
                       hover:font-bold w-full sm:w-auto">
        Add to Cart
    </button>

</div>
    )
}