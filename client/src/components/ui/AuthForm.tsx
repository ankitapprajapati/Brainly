import { useState } from "react";
import { useForm, } from "react-hook-form"
import Button from "./Button"
import Input from "./Input"
import VisibleIcon from "../../icons/VisibleIcon";
import NotVisibleIcon from "../../icons/NotVisibleIcon";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ApiConnector } from "../../operations/ApiConnector";
import { endPoints } from "../../operations/Api";

interface AuthFormProps{
  headerText : string;
  buttonText : string;
  isSignup : boolean;
  buttomText : string;
}

const AuthForm = ({buttonText,headerText,isSignup,buttomText}:AuthFormProps) => {
    const [loading,setLoading] = useState(false);
    const [showPass,setShowPass] = useState(false)
    const { register, handleSubmit} = useForm()
    const navigate = useNavigate()

    // const delay = (ms:number)=> new Promise( resolve=>setTimeout(resolve,ms));

    const onSubmit = ( data: any )=>{
      console.log("Form data : ",data)
      setLoading( ()=>true )
      const fetchData = async()=>{

        try{

          const clock = setTimeout( ()=>{
            toast.loading("Backend is hosted on free cluster. So it may take longer time !!",{
              duration : 7000,
              position : 'top-center',
              style : {
                borderRadius: '10px',
                background: '#363636',
                color: '#fff',
              }
            })
          },1000 );

          const response = await ApiConnector({
            method:"post",
            url : isSignup? endPoints.SIGN_UP : endPoints.SIGN_IN,
            body : {
              username : data.username,
              password : data.password,
              firstname : data.firstname,
              lastname : data.lastname,
            }
          })    
          
          localStorage.setItem("token",response.data.token)
          setLoading(false);

          toast.success( isSignup? "Signup successfully": "Logged in successfully",{
            duration : 3000,
            style:{
              background:'#363636',
              color : '#fff',
            },
          } )

          navigate("/dashboard");
          clearTimeout(clock);
        }
        catch(e:any){
          toast.error(e?.response?.data?.message || "Something went wrong!",{
            duration : 3000,
            style:{
              background : '#363636',
              color : '#fff'
            }
          })
          setLoading(false)
          console.error(e)
        }
      }
      fetchData();
    }
    
  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" border rounded shadow-md flex flex-col justify-center items-center gap-2 p-8">
            <h1 className="text-orange-500 text-3xl font-bold mb-6 ">{headerText}</h1>
            { isSignup &&
              <>
                <Input placeholder="Firstname" type="text" label="Firstname" name="firstname" register={register("firstname")}></Input>
                <Input placeholder="Lastname" type="text" label="Lastname" name="lastname" register={register("lastname")}></Input>
              </>
            }
            <Input placeholder="username" type="text" label="Username" name="username" register={register("username")}  />
            <Input placeholder="Password" type={showPass?"text":"password"} label="Password" name="password" register={register("password")} icon={ showPass? <VisibleIcon/>:<NotVisibleIcon/>} onIconClick={()=> setShowPass(s=>!s)}/>
            <div className="w-full mt-4">
              <Button variant="primary" text={buttonText} fullWidth={true} loading={loading} />
            </div>
            <div>
              <span className="text-white">{buttomText}</span>
              { isSignup ? 
                <span onClick={ ()=>navigate("/signin")} className="text-blue-700 cursor-pointer">Signin</span> :
                <span onClick={()=>navigate("/signup")} className="text-blue-700 cursor-pointer" >signup</span>
              }
            </div>
          </div>  
        </form>    
    </div>
  )
}

export default AuthForm
