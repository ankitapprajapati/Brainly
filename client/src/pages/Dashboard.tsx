import { useEffect, useState } from "react"
import Card from "../components/card/ContentCard"
import Sidebar from "../components/layout/Sidebar"
import { ApiConnector } from "../operations/ApiConnector"
import { endPoints } from "../operations/Api"
import { Content } from "../components/types/content"



const Dashboard = () => {
  const [allContent,setAllContent] = useState<Content[]>([])
  const [selectedType, setSelectedType ] = useState("My Brain");


  useEffect( ()=>{
    const fetchData = async()=>{
      const response = await ApiConnector({
        method : "get",
        url : endPoints.GET_CONTENT,
        headers : {
          authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      setAllContent(response.data.content)
    }
    
    fetchData();    
  },[])
  return (

    <div className=" bg-black flex w-screen ">      
      <div className="fixed">
        <Sidebar selectedType={selectedType} onSelect={setSelectedType}/>
      </div>      
      <div className="text-white grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 ml-52 md:ml-60 lg:ml-72 overflow-auto scrollbar-none ">
        { 
          allContent.map( (content,index)=>{
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
        }
      </div>
    </div>
  )
}
export default Dashboard