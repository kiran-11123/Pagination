import {ReactFlow , useNodesState , useEdgesState , addEdge , Background  , useEdges  , Controls } from "reactflow";
import  type {Node , Edge , Connection} from "reactflow"
import "reactflow/dist/style.css";

type CustomData ={
    label :string
} 



const initialNodes : Node<CustomData>[]  = [
      
    {
        id : "1",
        position : {x : 100 , y:100},
        data : { label: "API Gateway" }
    } ,

    {
        id : "2",
        position : {x : 100 , y:100},
        data : { label: "Frontend Server" }
    },

    {
        id : "3",
        position : {x : 100 , y:100},
        data : { label: "Backend Server" }
    },

    {
        id : "4",
        position : {x : 100 , y:100},
        data : { label: "Load Balancer" }
    },

    {
        id : "5",
        position : {x : 100 , y:100},
        data : { label: "Cache" }
    },
     {
        id : "6",
        position : {x : 100 , y:100},
        data : { label: "CDN" }
    }


]

const initialEdges :Edge[]  = []



export default function SideBar(){
      
  
    const[nodes , setNodes , onNodesChange] = useNodesState(initialNodes );
    const[edges , setEdges , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect  =(params :Connection)=>{
         setEdges((eds)=>addEdge(params,eds));
    }
     
    return(
         
        <div className="h-screen w-full ">

              <ReactFlow  
                
                nodes = {nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView

              
              />


        </div>  
    )
}