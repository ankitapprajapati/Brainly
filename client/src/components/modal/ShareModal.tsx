
import { toast } from "react-hot-toast";
import useStatus from "../../hooks/useStatus"
import { useEffect,useState } from "react";


interface shareModalProps{
    open : boolean,
    onClose : ()=> void,
}

const ShareModal = ({open,onClose}: shareModalProps) => {
  const {data,loading,error} = useStatus();
  const [copied,setCopied ] = useState(false)

  useEffect(()=>{
    if(open) setCopied(false);
  },[open])
  const handleCopy = async()=>{
    if( !data || !data.hash ) return ;

    try{
      await navigator.clipboard.writeText(data.hash)
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
            loading ? (
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
