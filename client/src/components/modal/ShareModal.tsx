
import { toast } from "react-hot-toast";

import { useEffect,useState } from "react";
import { ApiConnector } from "../../operations/ApiConnector";
import { endPoints } from "../../operations/Api";
import useStatus from "../../hooks/useStatus";


interface shareModalProps{
    open : boolean,
    onClose : ()=> void,
}

const ShareModal = ({open,onClose}: shareModalProps) => {
  console.log( "share modal")
  const {data,error,refetch} = useStatus();
  const [link, setLink ] = useState<string|null>(null);
  const [copied,setCopied ] = useState(false)

  console.log(data)

  useEffect(()=>{
    if(open) setCopied(false);
    if( data && data.live===true ){
      setLink(data.hash);
      return      
    }
    const createLink = async ()=>{
      try{
        const response = await ApiConnector({
          method:"post",
          url : endPoints.BRAIN_CREATE_LINK,
          headers:{
            authorization : `Bearer ${localStorage.getItem("token")}`
          },
          body : {
            share : true,
          }
        })

        setLink(response.data.hash)
        await refetch();
      }
      catch(e:any){
        console.log("Error while getting link : " ,e)
      }
      
    }
    createLink();
  },[open])

  const handleCopy = async()=>{
    if( !link  ) {
      return ;
    }

    try{
      await navigator.clipboard.writeText(link)
      console.log("setCopied = true")
      setCopied(true);
      toast.success("Link copied ",{
        duration:4000,
        position:"top-center",
        style:{
          borderRadius :'10px',
          background : '#363636',
          color : "#fff"
        }
      });
      setTimeout(()=>onClose(),1000);
    }
    catch(e){
      toast.error("Failed to copy link",{
        duration:4000,
        position:"top-center",
        style:{
          borderRadius :'10px',
          background : '#363636',
          color : "#fff"
        }
      })
    }
  }

  if( error ) return <p>Error...</p>

  return <>
    {open && 
      <div
        onClick={onClose}
        className="h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center"
      >
        <div 
          onClick={ (e)=>e.stopPropagation()}
          className=" border border-white/[0.2] rounded-md p-4 flex flex-col items-center justify-center text-white gap-4"
        >
          <span>Wait, We are generating link to your brain 🧠 </span>
          
          {
            link==null ? (
              <div className="flex items-center justify-center py-1 rounded-md text-md text-black bg-orange-200 w-full  animate-pulse ">Loading...</div>
            ) : 
            (
              <button
                onClick={handleCopy}
                className="bg-orange-400 text-sm px-4 py-1 rounded hover:bg-orange-700 transition w-full"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            )
          }
          
        </div>                        
      </div>
    }
  </>
}

export default ShareModal
