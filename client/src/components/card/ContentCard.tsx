import BookIcon from "../../icons/BookIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import ShareIcon from "../../icons/ShareIcon"
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { MusicIcon } from "../../icons/MusicIcon";
import { spotify } from "../../assets";
import toast from "react-hot-toast";
import { ApiConnector } from "../../operations/ApiConnector";
import { endPoints } from "../../operations/Api";

type Tag = {
  title : string,
}

interface CardProps{
  contentId : string,
  title : string;
  link  : string;
  type  : string,
  description : string,
  tags : Tag[],
}


const Card = ({contentId,title,link,type,description,tags}:CardProps) => {

  const defineType = ()=>{
    return (type==="twitter" && <TwitterIcon/>) || (type==="youtube" && <YoutubeIcon/>) || (type==="music" && <MusicIcon/>) || <BookIcon/>
  }

  const handleCopyToClipboard = ()=>{
    navigator.clipboard.writeText(link)
      .then( ()=>{
        toast.success(
          "Link copied",{
            duration : 3000, position : "top-center", 
            style : {
              background : '#363636', color : "#fff"
            }
          }
        )
      })
      .catch((e : any)=>{
        toast.error(
          "Failed to copy : "+e,{
            duration : 3000, position : "top-center", 
            style : {
              background : '#363636', color : "#fff"
            }
          }
        )
      })
  }

  const handleDelete = async ( contentId : string)=>{ 
    try {
      const response = await ApiConnector({
        method:"delete",
        url : endPoints.DELETE_CONTENT,
        body : {
          contentId : contentId,
        },
        headers:{
          authorization : "Bearer "+localStorage.getItem("token")
        }
      })   

      toast.success(response?.data?.message, {
        duration: 3000, position: 'top-center',
        style: {
            background: '#363636',
            color: '#fff',
        },
      })  
    } 
    catch(e){
      toast.error(
        "Failed to delete : "+e,{
          duration : 3000, position : "top-center", 
          style : {
            background : '#363636', color : "#fff"
          }
        }
      )      
    }
  }

  return (
    <div className=" text-white p-4 shadow-md border border-white/[0.2] rounded-md w-full min-w-60 max-w-80 min-h-80 max-h-80 overflow-hidden flex flex-col  ">

      {/* header */}
      <div className="flex justify-between gap-4">
        <div className="flex gap-4 items-center">
          <span className="pt-1 scale-110 cursor-pointer">
            {defineType()}
          </span>
          <div className="text-xl font-semibold text-orange-500">{title}</div>
        </div>
        <div className="flex gap-4 items-center">
          <span 
            onClick={handleCopyToClipboard}
            className="cursor-pointer trasition-transform duration-200 hover:scale-125 hover:text-blue-400"
          >
            <ShareIcon/>
          </span>
          <span 
            onClick={()=>handleDelete(contentId)}
            className="scale-110 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-red-600"
          >
            <DeleteIcon/>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-3 rounded-md scrollbar-hide">
        {type==="youtube" && <iframe className="w-full mt-4 " src={link?.split("&list=")[0].replace("watch?v=","embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
        {type==="twitter" && 
        <div className="">
          <blockquote className="twitter-tweet">
            <a href={link?.replace("x.com","twitter.com")
            }></a> 
          </blockquote> 
        </div>
        }
        {type==="music" && <div> <img src={spotify} alt="" /></div> }

        {/* description & tags */}
        <div className="">
          <p className=" mt-4 text-gray-400 text-base whitespace-pre-line break-words">{description}</p>
          <div className="flex flex-wrap gap-2 mt-2 absolute ">
            {
              tags?.map((tag,ind)=>(
                <span 
                  key={ind}
                  className="bg-stone-900 rounded-lg px-2 scale-90 text-blue-500"
                >
                  <i>{"#"}{tag.title}</i>
                </span>
              ))
            }
          </div>
        </div>
      </div>       
    </div>
  )
}

export default Card
