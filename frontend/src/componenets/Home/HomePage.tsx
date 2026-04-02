import axios from "axios";
import { useState  , useEffect } from "react"

const Products_API = import.meta.env.VITE_ORDERS_API

export default function HomePage(){
   
     const[products , SetProducts] = useState([]);
     const[message , SetMessage] = useState('');
    


    useEffect(()=>{

         async function getProducts(){
               
            try{

                const response = await axios.get(`${Products_API}/products/get-products` ,{
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
         <div >
               
               welcome to homepage
         </div>
    )
}