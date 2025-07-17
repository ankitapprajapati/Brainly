import { FormProvider, useForm } from "react-hook-form"
import FormContainer from "./FormContainer"
import Input from "../ui/Input"
import DropDownInput from "../ui/DropDownInput"
import TextArea from "../ui/TextArea"
import MultiTagInput from "../ui/MultiTagInput"
import Button from "../ui/Button"
import { useEffect, useState } from "react"
import { ApiConnector } from "../../operations/ApiConnector"
import { endPoints } from "../../operations/Api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Tag } from "../types/tag"

interface AddContentFormProps{
    onClose : ()=> void,
}




const AddContentForm = ({onClose}:AddContentFormProps) => {

    const navigate = useNavigate();

    const methods = useForm()
    const {handleSubmit,register}=methods
    const [loading,setLoading] = useState(false)
    const [Tags,setTags] = useState<Tag[]>([]);

    

    useEffect( ()=>{
        async function getTag() {
            try{
                const response = await ApiConnector({
                    method : "get",
                    url : endPoints.GET_TAG,
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setTags(response.data.tags)
            }
            catch(e:any){

            }
        }
        getTag();
    },[])

    const types = ["Youtube","Twitter","Link"];
    
    const onSubmit = async ( data : any)=>{
        setLoading(true)
        console.log("Add content : ",data)
        try{
            const response = await ApiConnector({
                method:"post",
                url : endPoints.CREATE_CONTENT,
                body:{
                    title : data.title,
                    description : data.description,
                    link : data.link,
                    type : data.type,
                    tags : data.tags
                },
                headers : {
                    authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            setLoading(true);
            onClose();

            toast.success( `${response.data.message}`,{
                duration : 3000,
                style:{
                    background:'#363636',
                    color : '#fff',
                },
            } )
        
            navigate("/dashboard");
        }
        catch(e:any){
            toast.error( e?.response?.data?.message || "Something went wrong!",{
                duration : 3000,
                style:{
                    background:'#363636',
                    color : '#fff',
                },
            } )  
            setLoading(false)
            console.error(e)          
        }
        finally{
            setLoading(false)
        }
    }
    
  return (
<FormProvider {...methods}>
    <FormContainer  title="Add Content" onClose={onClose} >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-2">
                <Input placeholder="Enter title" type="text" label="Title" name="title" register={register("title")}/>            
                <Input placeholder="Paste link"  type="text" label="Link" name="link" register={register("link")}/>
                <DropDownInput label="Type" name="type" register={register("type")} types={types}  />
                <TextArea placeholder="Description" label="Description" name="description" register={register("description")} />
                <MultiTagInput placeholder="Select tags" label="Tags" name="tags" tags={Tags} />
                <div className="mt-2">
                    <Button variant="primary" text="Submit"  fullWidth={true} loading={loading}  />
                </div>
            </div>
        </form>
    </FormContainer>
</FormProvider>
  )
}

export default AddContentForm
