import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"


const useLogout = () => {
    const navigate = useNavigate();

    return ()=>{
        localStorage.removeItem("token");

        toast.success("Logged Out",{
            duration:3000,
            position:"top-center",
            style:{
                background: "#363636",
                color: "#fff",
            }
        })
        navigate("/")
    }
}

export default useLogout
