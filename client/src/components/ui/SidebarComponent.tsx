import { ReactElement } from "react"

interface SidebarComponentProps{
    icon : ReactElement;
    text : String;
    selected : boolean;
    onClick ? : ()=> void ;
}
const SidebarComponent = ({icon,text,selected,onClick}:SidebarComponentProps) => {
  return (
    <div 
      className={`flex gap-8 items-center  max-w-64 h-10 hover:scale-110 hover:opacity- transition-all duration-500 rounded-md cursor-pointer ${selected ? "bg-blue-500 font-normal":""}`}
      onClick={onClick}
    >
        <span className="text-white pl-4 text-2xl" >{icon}</span> 
        <span className="text-white text-xl font-light hidden md:block">{text}</span> 
    </div>
  )
}

export default SidebarComponent
