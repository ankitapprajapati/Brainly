import { useRecoilState } from "recoil"
import { statusAtom } from "../atoms/statusAtom"
import { useCallback,useEffect,useState } from "react";
import { ApiConnector } from "../../operations/ApiConnector";
import { endPoints } from "../../operations/Api";


export const useStatus = ()=>{
    const [data,setData] = useRecoilState(statusAtom);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<String|null>(null)

    const fetchStatus = useCallback( async()=>{
        try{
            const response = await ApiConnector({
                url : endPoints.BRAIN_STATUS,
                method : "get",
                headers : {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(response.data)
            setError(null)
        }
        catch(e:any){
            setError(e.message || "Unknown error");
        }
        finally{
            setLoading(false)
        }
    },[])

    useEffect( ()=>{
        fetchStatus();
    },[fetchStatus]);


    return {data,error,loading,refetch:fetchStatus};

}