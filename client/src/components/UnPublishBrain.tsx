
import Toggle from "./ui/Toggle"
import useStatus from "../hooks/useStatus";
import { ApiConnector } from "../operations/ApiConnector";
import { endPoints } from "../operations/Api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const UnPublishBrain = () => {
  const [status,setStatus] = useState(false)
  const {data,loading,error} = useStatus();

  useEffect( ()=>{
    if(data) setStatus(data.live)
  },[data])

  const handleToggle = async ()=>{
    if( data===null ) return ;
    try{
      const response = await ApiConnector({
        method:"post",
        url : endPoints.BRAIN_CREATE_LINK,
        headers:{
          authorization : `Bearer ${localStorage.getItem("token")}`
        },
        body : {
          share : !status
        }
      })
      setStatus(response.data.live)
      toast.success(`${response.data.message}`,{
        duration:3000,
        position : 'top-center',
        style : {
          background : '#363636',
          color : '#fff'
        }
      }
    )
    }
    catch(e:any){
      console.error("Failed to update share status : ",e);
    }
  }
  if( loading ) return <p className="text-white ml-4">Loading...</p>
  if( error ) return <p className="text-red ml-4">Error...</p>
  

  return (
    <Toggle title="Share Brain" status={status} onChange={handleToggle}  />
  )
}

export default UnPublishBrain
