import { 
    AnimatePresence,
    motion
 } from "framer-motion"

 
import FloatingNavButton from "../ui/FloatingNavButton"
import { useNavigate } from "react-router-dom"
import HomeIcon from "../../icons/HomeIcon"
import DashboardIcon from "../../icons/DashboardIcon"
import FloatingNavOption from "../ui/FloatingNavOption"
import useLogout from "../../hooks/useLogout"

const FloatingNavbar = () => {
    const navigate = useNavigate()
    const visible= true

    const logOutHandler = useLogout();

    const navbarItems = [
        { name:"Home", link:"/" , icon:<HomeIcon/>},
        { name:"Dashboard", link:"/dashboard", icon:<DashboardIcon/>}
    ]

  return (
    <AnimatePresence mode="wait">
        <motion.div 
            initial={{
                opacity: 1,
                y: -100,
            }}
            animate={{
                y: visible ? 0 : -100,
                opacity: visible ? 1 : 0,
            }}
            transition={{
                duration: 1,
            }}
            className=" flex max-w-fit gap-2 border border-white/[0.2] py-4 rounded-full px-8 mx-auto "
        >
            <div className="flex gap-4 pr-2">
                { navbarItems.map((navbarItem:any,ind:number)=>
                    <FloatingNavOption 
                        key={ind} 
                        text={navbarItem.name} 
                        icon={navbarItem.icon} 
                        link={navbarItem.link}
                    />
                )}
            </div>
            { !localStorage.getItem("token")?
                <>
                    <FloatingNavButton text="Login" onclick={()=>navigate("/signin")}/>
                    <FloatingNavButton text="Sign Up" onclick={()=>navigate("/signup")}/>
                </>
                :
                <>
                    <FloatingNavButton text="Log Out" onclick={logOutHandler}/>
                </>
            }
        </motion.div>

    </AnimatePresence>
  )
}

export default FloatingNavbar
