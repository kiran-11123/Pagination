export default function Card({ type, description, amount }){
     return(
         <div className="w-full max-w-72 h-72 bg-gray-200 p-4 shadow-sm rounded-md flex flex-col items-center justify-between">

            <div className="flex bg-slate-500 w-full items-center justify-center px-6 py-2 rounded-sm text-white">Type : {type}</div>

            <div className="flex bg-slate-500 w-full items-center justify-center px-6 py-2 rounded-sm text-white">Description :{description}</div>

            <div className="flex bg-slate-500 w-full items-center justify-center px-6 py-2 rounded-sm text-white">Amount : {amount}</div>
            
         </div>
     )
}