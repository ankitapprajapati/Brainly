import { useNavigate } from "react-router-dom"
import { brain } from "../../assets"
import { BrainIcon } from "../../icons/BrainIcon"
import { LinkIcon } from "../../icons/LinkIcon"
import LogoutIcon from "../../icons/LogoutIcon"
import { MusicIcon } from "../../icons/MusicIcon"
import PlusIcon from "../../icons/PlusIcon"
import ShareIcon from "../../icons/ShareIcon"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import SidebarComponent from "../ui/SidebarComponent"
import { useState } from "react"
import ShareModal from "../modal/ShareModal"
import { CreateContentModal } from "../modal/CreateContentModal"
import { LogoutModal } from "../modal/LogoutModal"



const Sidebar = () => {
  const navigate = useNavigate();
  const [openCreateModal,setOpenCreateModal] = useState(false);
  const [openShareModal,setOpenShareModal] = useState(false);
  const [openLogoutModal,setOpenLogoutModal] = useState(false);

  const handleCreateModal = ()=>setOpenCreateModal((s)=>!s)
  const handleShareModal = ()=>setOpenShareModal((s)=>!s)
  const handleLogoutModal = ()=>setOpenLogoutModal((s)=>!s)


  const handleImageClick = ()=> navigate("/")

  return (
    <div className="absolute left-0 top-0 pl-6 flex flex-col gap-2 mt-4 min-w-20 md:min-w- lg:min-w-72 border border-white/[0.2] h-auto px-4 rounded-md">
      <CreateContentModal open={openCreateModal} onClose={handleCreateModal}/>
      <ShareModal open={openShareModal} onClose={handleShareModal}/>
      <LogoutModal open={openLogoutModal} onClose={handleLogoutModal} />
      

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
      <SidebarComponent text="My Brain" icon={<BrainIcon/>} selected={false} onClick={()=> navigate("/dashboard")} />
      <SidebarComponent text="Twitter" icon={<TwitterIcon/>} selected={false} />  
      <SidebarComponent text="Youtube" icon={<YoutubeIcon/>} selected={false}/>
      <SidebarComponent text="Music"  icon={<MusicIcon/>} selected={true} />
      <SidebarComponent text="Link"  icon={<LinkIcon/>} selected={false} />
      <SidebarComponent text="Add Contact" icon={<PlusIcon/>} selected={false} onClick={handleCreateModal}/>
      <SidebarComponent text="Share"  icon={<ShareIcon/>} selected={false}/>
      <SidebarComponent text="Logout" icon={<LogoutIcon/>} selected={false} onClick={handleLogoutModal}/>
    </div>
  )
}

export default Sidebar
