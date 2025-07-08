import FloatingNavbar from "../components/layout/FloatingNavbar"
import useStatus from "../hooks/useStatus"


const Landing = () => {
  const  {data} = useStatus();
  console.log(data)

  // if( data ){
  //   return(
  //     <div className="text-white bg-yellow-800">
  //       <span>{data?.status}</span>
  //       <span>{data?.link}</span>
  //     </div>
  //   )
  // }
  return (
    <div className="bg-black w-full h-screen py-10">
      <FloatingNavbar/>
    </div>    
  )
}

export default Landing
