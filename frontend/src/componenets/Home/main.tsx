
import SideBar from "./Sidebar"
import MainFlow from "./MainFlow"

import ReactFlow from "reactflow"
import "reactflow/dist/style.css"
import { ReactFlowProvider } from "reactflow"


export default function Main(){
     return (
       <ReactFlowProvider>
     <div className="flex h-screen w-full items-center justify-center gap-4">
        <SideBar />
        <MainFlow />
      </div>

       </ReactFlowProvider>
    )
}