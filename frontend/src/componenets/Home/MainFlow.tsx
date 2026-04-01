
import { useCallback } from "react"
import SideBar from "./Sidebar";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import type {Node ,Edge , Connection} from "reactflow"

import "reactflow/dist/style.css";

type CustomNodeData = {
  label: string;
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
  },
];


const initialEdges: Edge[] = [];


export default function MainFlow(){

    const[nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
    const[edges , setEdges , onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

   const addNode = (label: string) => {
    const newNode: Node<CustomNodeData> = {
      id: `${Date.now()}`,
      position: {
        x: 150 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      },
      data: { label },
    };

    setNodes((prev) => [...prev, newNode]);
  };


    return (
    <>
      <SideBar onAddNode={addNode} />

      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );

}