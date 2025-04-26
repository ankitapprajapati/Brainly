import Card from "../components/ui/Card"
import Sidebar from "../components/ui/Sidebar"

const Dashboard = () => {
  return (
    <div className="h-screen w-full bg-black flex overflow-y-auto ">
      <Sidebar/>
      <div className="text-white pl-20 ml-auto">
        <Card link="https://www.youtube.com/watch/QxwmIXIWO7I?si=MRqntSSyMN0cF5xG" type="youtube" title="song"/>
        <Card link="https://x.com/nitesh_singh5/status/1913474131791671604" type="twitter" title="first tweet"/>
    </div>
    </div>
  )
}
export default Dashboard
