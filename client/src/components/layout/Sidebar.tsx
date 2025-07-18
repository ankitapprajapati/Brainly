import { useNavigate } from "react-router-dom"
import { brain } from "../../assets"
import { BrainIcon } from "../../icons/BrainIcon"
import { LinkIcon } from "../../icons/LinkIcon"
import LogoutIcon from "../../icons/LogoutIcon"
import PlusIcon from "../../icons/PlusIcon"
import ShareIcon from "../../icons/ShareIcon"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import SidebarComponent from "../ui/SidebarComponent"
import { ReactElement, useState } from "react"
import ShareModal from "../modal/ShareModal"
import { CreateContentModal } from "../modal/CreateContentModal"
import { LogoutModal } from "../modal/LogoutModal"

interface SidebarProps{
  selectedType : string,
  onSelect : (type:string)=> void
}

interface sidebarComponentsOptionsProps{
  text : string,
  icon : ReactElement,
  onClick? : ()=>void,
  isModal? : "create"|"share"|"logout"
}

const Sidebar = ( {selectedType,onSelect} : SidebarProps) => {
  const navigate = useNavigate();
  const [openCreateModal,setOpenCreateModal] = useState(false);
  const [openShareModal,setOpenShareModal] = useState(false);
  const [openLogoutModal,setOpenLogoutModal] = useState(false);

  const handleCreateModal = ()=>setOpenCreateModal((s)=>!s)
  const handleShareModal = ()=>setOpenShareModal((s)=>!s)
  const handleLogoutModal = ()=>setOpenLogoutModal((s)=>!s)

  const handleImageClick = ()=> navigate("/")

  const sidebarComponentOptions : sidebarComponentsOptionsProps[] = [
    {text:"My Brain",    icon:<BrainIcon/>  , onClick : ()=> onSelect("My Brain")} ,
    {text:"Twitter",     icon:<TwitterIcon/>, onClick : ()=> onSelect("Twitter") },
    {text:"Youtube",     icon:<YoutubeIcon/>, onClick : ()=> onSelect("Youtube") },
    {text:"Link",        icon:<LinkIcon/>   , onClick : ()=> onSelect("Link") },
    {text:"Add Contant", icon:<PlusIcon/>   , onClick : handleCreateModal, isModal:"create" },
    {text:"Share",       icon:<ShareIcon/>  , onClick : handleShareModal, isModal:"share" },
    {text:"Logout",      icon:<LogoutIcon/> , onClick : handleLogoutModal, isModal:"logout" },
  ]

  return (
    <div className="absolute left-0 top-0 pl-6 flex flex-col gap-2 mt-4 w-24 md:min-w-56 lg:min-w-72 border border-white/[0.2] h-auto px-4 rounded-md">
      {openCreateModal && <CreateContentModal open={openCreateModal} onClose={handleCreateModal}/>}
      {openShareModal && <ShareModal open={openShareModal} onClose={handleShareModal}/>}
      { openLogoutModal && <LogoutModal open={openLogoutModal} onClose={handleLogoutModal} />}
      

      <div className="py-10 flex items-center">
        <img 
          className="h-20 cursor-pointer"
          src={brain} alt=""  
          onClick={handleImageClick}
        />
        <a
          className="absolute top-14 left-24 text-orange-500 font-bold text-3xl hover:cursor-pointer hidden md:block"
          href="/"
        >
          BRAINLY
        </a>
      </div>

      {/* options */}
      { sidebarComponentOptions.map( ({text,icon,onClick})=>{
        return (
          <SidebarComponent
            key={text}
            text={text}
            icon={icon}
            selected={selectedType===text}
            onClick={onClick}
          />
        )})
      }
      
    </div>
  )
}

export default Sidebar
