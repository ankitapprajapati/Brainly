import { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { ApiConnector } from "../operations/ApiConnector";
import { endPoints } from "../operations/Api";
import toast from "react-hot-toast";

const useAuthGuard = () => {
    const [checking,setChecking ] = useState(true);
    const navigate =  useNavigate();

    useEffect(()=>{
        const check = async ()=>{
            try{
                await ApiConnector({
                    method : "get",
                    url : endPoints.PROFILE,
                    headers : {
                        authorization : `Bearer ${localStorage.getItem("token")}`
                    },
                })
                setChecking(false)
            }
            catch(e:any){
                const message = e?.response?.data?.message || "Authentication failed";
                toast.error(message,{
                    duration:4000,
                    position : "top-center",
                    style : {
                        background : "#363636",
                        color : "#fff",
                        borderRadius : "10px"
                    }
                })

                localStorage.removeItem("token");
                navigate('/signin')
            }
        }
        check();
    },[])
  return {checking}
}

export default useAuthGuard
