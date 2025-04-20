import BookIcon from "../../icons/BookIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import PlusIcon from "../../icons/PlusIcon"
import ShareIcon from "../../icons/ShareIcon"

interface CardProps{
  title : string;
  link?  : string;
  type  : "twitter" | "youtube" | "other";
}


const Card = ({title,link,type}:CardProps) => {
  return (
    <div className="bg-slate-50 text-black p-4 max-w-72 shadow-md border mt-2">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center"><BookIcon/> {title}</div>
        <div className="flex gap-4 items-center">
          <div><ShareIcon/></div>
          <div><DeleteIcon/></div>
        </div>
      </div>

      <div>
        {type==="youtube" && <iframe className="w-full mt-4" src={link?.replace("watch","embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
        {type==="twitter" && 
          <blockquote className="twitter-tweet">
            <a href={link?.replace("x.com","twitter.com")
            }></a> 
          </blockquote> 
        }
      </div>
      
      
            
    </div>
  )
}

export default Card
