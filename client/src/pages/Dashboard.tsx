import { useEffect, useState } from "react"
import Card from "../components/card/ContentCard"
import Sidebar from "../components/layout/Sidebar"
import { ApiConnector } from "../operations/ApiConnector"
import { endPoints } from "../operations/Api"



const Dashboard = () => {
  const [allContent,setAllContent] = useState([])
  useEffect( ()=>{
    const fetchData = async()=>{
      const response = await ApiConnector({
        method : "get",
        url : endPoints.GET_CONTENT,
        headers : {
          authorization : `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response.data.content)
    }
    
    fetchData();    
  },[])
  return (

    <div className=" bg-black flex w-screen h-screen">      
      <Sidebar/>
      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 ml-80">
        <Card link="https://www.youtube.com/watch?v=PuyPnZQ9xCA" type="youtube" title="Skill" description="Choose me if you want" tags={[{title:"development"},{title:"dsa"}]}/>
        <Card link="https://www.youtube.com/watch?v=4dsFQFCvVGU" type="youtube" title="song"/>
        <Card link="https://x.com/nitesh_singh5/status/1913474131791671604" type="twitter" title="first tweet" description="Choose me if you want once in life i will definelty fuck you with condom beacaus eim afrait to fuchk you bcs rouy ass is full of bacteria" tags={[{title:"development"},{title:"dsa"}]} />
        <Card link="https://www.youtube.com/watch?v=coJk0K40wqE" type="youtube" title="song"/>
       </div>
    </div>
  )
}
export default Dashboard