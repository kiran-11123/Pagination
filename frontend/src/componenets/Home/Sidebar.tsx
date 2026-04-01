
import "reactflow/dist/style.css";

type SideBarProps = {
    onAddNode?: (label: string) => void;
}


const items = ['Cache', 'Database', 'API gateway', 'Load balancer', 'Message queue', 'Authentication service', 'Notification service', 'Logging service', 'Monitoring service', 'Analytics service', 'Search engine', 'CDN', 'Object storage', 'File storage', 'Email service', 'SMS service', 'Payment gateway', 'Third-party API']





export default function SideBar({ onAddNode }: SideBarProps) {



    return (

        <div className="w-64 bg-slate-900 text-white p-4 border-r border-slate-700 ">

            <h2 className="text-lg font-bold mb-4">Components</h2>

            <div className=" flex flex-col gap-3">

                {items.map((item, index) => (

                    <button
                        key={item}
                        onClick={() => onAddNode?.(item)}
                        className="text-left px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                    >
                        {item}
                    </button>
                ))}

            </div>

        </div>





    )
}