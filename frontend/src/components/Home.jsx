import { useState } from "react"
import axios from "axios"
import Card from "./Card";
import { useEffect } from "react";
export default function Home() {

    const [data, setData] = useState([]);
    const[count , setCount] =useState(0);
  const [hasMore, setHasMore] = useState(true);

    useEffect(() => {

        GetData(count);
    }, [count])

     function DecreaseCount() {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  }

  // next page
  function IncreaseCount() {
    if (hasMore) {
      setCount((prev) => prev + 1);
    }
  }
    async function GetData(page_number) {

        try {

            const response = await axios.get(`http://localhost:5000/api/v1/page?page=${page_number}`);

            if (response.status === 200) {
                if (response.data.data.length > 0) {
                    setData(response.data.data);
                     setHasMore(true);
                }
            }
            else {
                setHasMore(false);
          if (page_number > 0) setCount(page_number - 1);
            }

        }
        catch (er) {
           
                alert("Internal Server Error")
            
        }

    }


    return (
        <div className="flex flex-col overflow-auto items-center justify-between  p-5  bg-slate-50 rounded-md">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.map((e, index) => (
                    <Card
                        key={index}
                        amount={e.amount}
                        description={e.description}
                        type={e.type}
                    />
                ))}
            </div>


            <div className="flex items-center justify-between w-full ">
               <button
          className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:opacity-50"
          onClick={DecreaseCount}
          disabled={count === 0}
        >
          Decrease
        </button>

        <p className="font-semibold text-gray-700">Page: {count + 1}</p>

        <button
          className="px-4 py-2 bg-blue-800 text-white rounded-md disabled:opacity-50"
          onClick={IncreaseCount}
          disabled={!hasMore}
        >
          Increase
        </button>
            </div>

        </div>
    )
}