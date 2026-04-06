import axios from "axios";
import { useState  , useEffect } from "react"
import NavBar from "./NavBar";
import Card from "./Card";


interface Products{
     
    productId : number,
    productName :string,
    price : number,
    category : string
}
const Products_API = import.meta.env.VITE_ORDERS_API

export default function HomePage(){
   
     const[products , SetProducts] = useState<Products[]>([]);
     const[message , SetMessage] = useState('');
    


    useEffect(()=>{

         async function getProducts(){
               
            try{

                const response = await axios.get(`${Products_API}products/get-products` ,{
                    withCredentials : true
                } )

                if(response.status === 200){
                      SetProducts(response.data.products);
                      SetMessage('products fetched successfully')
                }
                else{
                     
                    SetMessage(response.data.message);
                }

            }
            catch(er){
                 SetMessage("Something went wrong while fetching the products")
            }
            
         }

         getProducts();

    } ,[])

   
      
    return (
         <div  className="flex flex-col min-h-screen max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-full mx-auto ">
                
               <NavBar />


                <div className="flex flex-wrap  gap-5 justify-center mt-5">

                      {products.length >0 &&(
                          
                          products.map((item: Products)=>(
                                
                              <Card  {...item}/>
                          ))
                      )}

                      {products.length === 0 &&(
                          <p>{message}</p>
                      ) }

                </div>


             

               
               
         </div>
    )
}