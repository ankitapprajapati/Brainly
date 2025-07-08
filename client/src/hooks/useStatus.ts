import { useEffect, useState } from "react"
import { ApiConnector } from "../operations/ApiConnector"
import { endPoints } from "../operations/Api"
import { statusProps } from "../components/types/status"

const useStatus = () => {
    const [ data,setData ] = useState<statusProps|null>(null)
    const [ loading,setLoading ] = useState<boolean> (true);
    const [ error,setError ] = useState<string|null>(null)

    useEffect(()=>{
        const fetchResponce = async()=>{
            try{
                const response = await ApiConnector({
                    method:"get",
                    url : endPoints.BRAIN_STATUS,
                    headers :{
                        authorization :  `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(response.data)

            }
            catch(e:any){
                setError(e.message||"Unknown Error")
            }
            finally{
                setLoading(false)
            }
        }
        fetchResponce();
    },[])
  return {data,loading,error}
}

export default useStatus
