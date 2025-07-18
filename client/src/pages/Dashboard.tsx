import { useEffect, useState } from "react"
import Card from "../components/card/ContentCard"
import Sidebar from "../components/layout/Sidebar"
import { ApiConnector } from "../operations/ApiConnector"
import { endPoints } from "../operations/Api"
import { Content } from "../components/types/content"
import UnPublishBrain from "../components/UnPublishBrain"
import useAuthGuard from "../hooks/useAuthGuard"


const Dashboard = () => {
  const [allContent,setAllContent] = useState<Content[]>([])
  const [filteredContent,setFilteredContent] = useState<Content[]>([])
  const [selectedType, setSelectedType ] = useState("My Brain");
  const [loading , setLoading ] = useState(true);

  const {checking} = useAuthGuard();
  
  useEffect( ()=>{
      if( checking ) return 
    const fetchData = async()=>{
      try{
        const response = await ApiConnector({
          method : "get",
          url : endPoints.GET_CONTENT,
          headers : {
            authorization : `Bearer ${localStorage.getItem("token")}`
          }
        })
        setAllContent(response.data.content)
        setLoading(false)
      }
      catch(e:any){
        console.error("Error fetching content:", e);
      }
      finally{
        setLoading(false)
      }
    }
    
    fetchData();    
  },[checking])

  useEffect( ()=>{
    const filtered =
      ( selectedType==="My Brain" ) ?  
      allContent
      :
      allContent.filter(
        (content)  => {
          console.log(`${selectedType},${content.type}`)
          return content.type === selectedType
        }
      )
      setFilteredContent(filtered)
  },[selectedType,allContent])

  if( checking ) return <div className="h-screen w-screen bg-slate-500 text-black text-lg">we are checking</div>  

  return (

    <div className=" bg-black flex w-screen ">      
      <div className="fixed">
        <Sidebar selectedType={selectedType} onSelect={setSelectedType}/>
      </div>      
      <div className="w-full ml-52 md:ml-60 lg:ml-72 p-4 flex flex-col gap-4 ">
        <div className="py-4 flex justify-between pr-20 md:pr-10 sm:pr-2 border border-white/[0.2] rounded-md px-4">
          <span className="text-white font-semibold text-2xl">Workspace</span>
          <UnPublishBrain/>
        </div> 
        { loading===true ? ( <div className="text-white">..................Loading.........</div>  ) :     
        (<div className="text-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  overflow-auto scrollbar-none ">
          { filteredContent.length > 0 ? (
              filteredContent.map( (content,index)=>{
                return (
                  <Card
                    key={index}
                    contentId={content._id}
                    title={content.title}
                    description={content.description}
                    link={content.link}
                    tags={content.tags}
                    type={content.type}                
                  />
                )
              })
          ) : <div> opps no item found.........</div>
          }
        </div>)
        }
      </div>
    </div>
  )
}
export default Dashboard